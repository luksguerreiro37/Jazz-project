const { Router } = require('express');
const authController = require('../controllers/auth.controller');

const router = Router();

router.post('/client', authController.loginClient);
router.post('/admin', authController.loginAdmin);
router.get('/', authController.getUserByToken);

module.exports = router;
