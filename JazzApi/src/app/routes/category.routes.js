const { Router } = require('express');
const categoryController = require('../controllers/category.controller');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.post('/', isAdmin, categoryController.createCategory);
router.delete('/:id', isAdmin, categoryController.deleteCategory);
router.get('/', categoryController.getAllCategories);

module.exports = router;
