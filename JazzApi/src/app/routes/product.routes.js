const { Router } = require('express');
const productController = require('../controllers/product.controller');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.post('/', isAdmin, productController.createProduct);
router.put('/:id', isAdmin, productController.updateProduct);
router.delete('/:id', isAdmin, productController.deleteProduct);
router.get('/', productController.getAllProducts);

module.exports = router;
