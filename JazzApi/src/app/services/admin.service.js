const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { AdminNotFoundError, InvalidCredentialsError } = require('../errors/admin.errors');
const userSchemas = require('../schemas/User.schemas'); // Ajuste o caminho conforme necessário

const getAdmin = async (adminId) => {
  return Admin.findByPk(adminId);
};

const updateAdmin = async (adminId, adminData) => {
  const validationErrors = userSchemas.editUserSchema('admin', adminData.name, adminData.mail, adminData.password, adminData.username);

  if (validationErrors) {
    throw new Error('Dados inválidos: ' + JSON.stringify(validationErrors));
  }

  const admin = await Admin.findByPk(adminId);
  if (!admin) {
    throw new AdminNotFoundError();
  }
  
  if (adminData.password) {
    adminData.password = await bcrypt.hash(adminData.password, 10);
  }
  return admin.update(adminData);
};

module.exports = {
  getAdmin,
  updateAdmin,
};
