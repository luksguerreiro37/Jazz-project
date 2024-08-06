const { Router } = require('express');
const clientRoutes = require('./client.routes');
const authRoutes = require('./auth.routes');
const productRoutes = require('./product.routes');
const adminRoutes = require('./admin.routes');
const orderRoutes = require('./order.routes');
const categoryRoutes = require('./category.routes')

const routes = Router();

routes.use('/client', clientRoutes);
routes.use('/auth', authRoutes);
routes.use('/products', productRoutes);
routes.use('/admin', adminRoutes);
routes.use('/orders', orderRoutes);
routes.use('/categories', categoryRoutes);

module.exports = routes;
