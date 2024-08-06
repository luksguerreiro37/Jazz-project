const Order = require('../models/Order');
const Product = require('../models/Product');
const FinishedOrder = require('../models/FinishedOrder');
const CanceledOrder = require('../models/CanceledOrder');
const { OrderNotFoundError } = require('../errors/order.errors');

const createOrder = async (orderData, clientId) => {
  const products = await Product.findAll({ where: { productId: orderData.items } });
  const totalValue = products.reduce((sum, product) => sum + parseFloat(product.value), 0).toFixed(2);
  
  const order = await Order.create({
    items: orderData.items,
    value: totalValue,
    clientId: clientId,
    createdDate: new Date(),
    isOpen: true,
  });

  return order;
};

const getOrder = async (orderId) => {
  const order = await Order.findByPk(orderId, {
    include: [{ model: Product, as: 'products' }],
  });

  if (!order) {
    throw new OrderNotFoundError();
  }

  return order;
};

const updateOrder = async (orderId, orderData) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new OrderNotFoundError();
  }

  if (orderData.isOpen === false) {
    await FinishedOrder.create({
      id: order.id,
      value: order.value,
      clientId: order.clientId,
      createdDate: order.createdDate,
    });
    await order.destroy();
  } else {
    return order.update(orderData);
  }
};

const deleteOrder = async (orderId) => {
  const order = await Order.findByPk(orderId);
  if (!order) {
    throw new OrderNotFoundError();
  }

  await CanceledOrder.create({
    id: order.id,
    value: order.value,
    clientId: order.clientId,
    createdDate: order.createdDate,
  });

  return order.destroy();
};

const getAllOrders = async () => {
  return Order.findAll({
    include: [{ model: Product, as: 'products' }],
  });
};

module.exports = {
  createOrder,
  getOrder,
  updateOrder,
  deleteOrder,
  getAllOrders,
};
