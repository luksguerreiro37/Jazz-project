const Admin = require('../models/Admin');
const Client = require('../models/Client');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { ClientNotFoundError, AdminNotFoundError, InvalidPasswordError } = require('../errors/auth.errors');

const loginClient = async ({ usernameOrEmail, password }) => {
  let client;
  if (usernameOrEmail.includes('@')) {
    client = await Client.findOne({ where: { email: usernameOrEmail } });
  } else {
    client = await Client.findOne({ where: { username: usernameOrEmail } });
  }

  if (!client) {
    throw new ClientNotFoundError('Usuário/email não registrado');
  }

  const passwordMatch = await bcrypt.compare(password, client.password);
  if (!passwordMatch) {
    throw new InvalidPasswordError();
  }

  const token = jwt.sign({ id: client.clientId, role: 'client' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, name: client.name };
};

const loginAdmin = async ({ usernameOrEmail, password }) => {
  let admin;
  if (usernameOrEmail.includes('@')) {
    admin = await Admin.findOne({ where: { email: usernameOrEmail } });
  } else {
    admin = await Admin.findOne({ where: { username: usernameOrEmail } });
  }

  if (!admin) {
    throw new AdminNotFoundError('Usuário/email não registrado');
  }

  const passwordMatch = await bcrypt.compare(password, admin.password);
  if (!passwordMatch) {
    throw new InvalidPasswordError();
  }

  const token = jwt.sign({ id: admin.adminId, role: 'admin' }, process.env.JWT_SECRET, { expiresIn: '1d' });
  return { token, name: admin.name }; 
};

const getUserByToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    if (decodedToken.role === 'client') {
      const client = await Client.findByPk(decodedToken.id);
      if (!client) {
        throw new InvalidTokenError('Cliente não encontrado');
      }
      return { id: client.clientId, name: client.name, role: 'client' };
    } else if (decodedToken.role === 'admin') {
      const admin = await Admin.findByPk(decodedToken.id);
      if (!admin) {
        throw new InvalidTokenError('Administrador não encontrado');
      }
      return { id: admin.adminId, name: admin.name, role: 'admin' };
    } else {
      throw new InvalidTokenError('Role inválida no token');
    }
  } catch (error) {
    throw new InvalidTokenError('Token inválido ou expirado');
  }
};

module.exports = {
  loginClient,
  loginAdmin,
  getUserByToken,
};
