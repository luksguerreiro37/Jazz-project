const clientService = require('../services/client.services');
const {
  ClientNotFoundError,
  DatabaseError,
} = require('../errors/client.errors');

const createClient = async (req, res) => {
  try {
    const client = await clientService.createClient(req.body);
    res.status(201).json(client);
  } catch (error) {
    if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getClient = async (req, res) => {
  try {
    const client = await clientService.getClient(req.params.id);
    if (!client) {
      throw new ClientNotFoundError();
    }
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof ClientNotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const updateClient = async (req, res) => {
  try {
    const client = await clientService.updateClient(req.params.id, req.body);
    res.status(200).json(client);
  } catch (error) {
    if (error instanceof DatabaseError || error instanceof ClientNotFoundError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const deleteClient = async (req, res) => {
  try {
    await clientService.deleteClient(req.params.id);
    res.status(204).send();
  } catch (error) {
    if (error instanceof ClientNotFoundError) {
      res.status(404).json({ error: error.message });
    } else if (error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const getClientOrders = async (req, res) => {
  try {
    const orders = await clientService.getClientOrders(req.params.id);
    res.status(200).json(orders);
  } catch (error) {
    if (error instanceof ClientNotFoundError || error instanceof DatabaseError) {
      res.status(error.statusCode).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = {
  createClient,
  getClient,
  updateClient,
  deleteClient,
  getClientOrders,
};
