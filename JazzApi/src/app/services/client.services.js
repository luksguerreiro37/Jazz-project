const Client = require('../models/Client');
const bcrypt = require('bcryptjs');
const { ClientNotFoundError, DatabaseError } = require('../errors/client.errors');
const userSchemas = require('../schemas/User.schemas'); // Ajuste o caminho conforme necessário

const getClientById = async (clientId) => {
  try {
    const client = await Client.findByPk(clientId);
    if (!client) {
      throw new ClientNotFoundError();
    }
    return client;
  } catch (error) {
    throw new DatabaseError('Erro ao buscar cliente: ' + error.message);
  }
};

const updateClient = async (clientId, clientData) => {
  try {
    const validationErrors = userSchemas.editUserSchema('client', clientData.name, clientData.mail, clientData.password, clientData.username);

    if (validationErrors) {
      throw new Error('Dados inválidos: ' + JSON.stringify(validationErrors));
    }

    const client = await Client.findByPk(clientId);
    if (!client) {
      throw new ClientNotFoundError();
    }
    
    if (clientData.password) {
      clientData.password = await bcrypt.hash(clientData.password, 10);
    }
    return client.update(clientData);
  } catch (error) {
    throw new DatabaseError('Erro ao atualizar cliente: ' + error.message);
  }
};

const deleteClient = async (clientId) => {
  try {
    const client = await Client.findByPk(clientId);
    if (!client) {
      throw new ClientNotFoundError();
    }
    await client.destroy();
    return client;
  } catch (error) {
    throw new DatabaseError('Erro ao deletar cliente: ' + error.message);
  }
};

const createClient = async (clientData) => {
  try {
    const validationErrors = userSchemas.createUserSchema('client', clientData.name, clientData.mail, clientData.password, clientData.username);

    if (validationErrors) {
      throw new Error('Dados inválidos: ' + JSON.stringify(validationErrors));
    }

    const existingClient = await Client.findOne({ where: { email: clientData.mail } });
    if (existingClient) {
      throw new Error('Email já cadastrado');
    }

    clientData.password = await bcrypt.hash(clientData.password, 10);

    const newClient = await Client.create(clientData);
    return newClient;
  } catch (error) {
    throw new DatabaseError('Erro ao criar cliente: ' + error.message);
  }
};

module.exports = {
  getClientById,
  updateClient,
  deleteClient,
  createClient,
};
