const { Router } = require('express');
const clientController = require('../controllers/client.controller');
const isClient = require('../middlewares/isClient');

const router = Router();

router.post('/', clientController.createClient);
router.get('/:id', isClient, clientController.getClient);
router.put('/:id', isClient, clientController.updateClient);
router.delete('/:id', isClient, clientController.deleteClient);
router.get('/:id/orders', isClient, clientController.getClientOrders);

module.exports = router;
