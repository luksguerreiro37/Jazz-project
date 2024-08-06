const { Router } = require('express');
const orderController = require('../controllers/order.controller');
const isClient = require('../middlewares/isClient');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.post('/', isClient, orderController.createOrder);
router.get('/:id', isClient, orderController.getOrder);
router.put('/:id', isAdmin, orderController.updateOrder);
router.delete('/:id', isAdmin, orderController.deleteOrder);
router.get('/', isAdmin, orderController.getAllOrders);

module.exports = router;
