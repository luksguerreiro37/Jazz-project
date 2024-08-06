const orderService = require('../services/order.services');
const { OrderNotFoundError } = require('../errors/order.errors');

const createOrder = async (req, res) => {
  try {
    const order = await orderService.createOrder(req.body, req.userId);
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await orderService.getOrder(req.params.id);
    if (!order) {
      throw new OrderNotFoundError();
    }
    res.status(200).json(order);
  } catch (error) {
    if (error instanceof OrderNotFoundError) {
      res.status(404).json({ error: error.message });
    } else {
      res.status(400).json({ error: error.message });
    }
  }
};

const updateOrder = async (req, res) => {
  try {
    const order = await orderService.updateOrder(req.params.id, req.body);
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  try {
    await orderService.deleteOrder(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.getAllOrders();
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
