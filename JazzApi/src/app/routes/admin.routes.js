const { Router } = require('express');
const adminController = require('../controllers/admin.controller');
const isAdmin = require('../middlewares/isAdmin');

const router = Router();

router.get('/:id', isAdmin, adminController.getAdmin);
router.put('/:id', isAdmin, adminController.updateAdmin);

module.exports = router;
