const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/register', authMiddleware, authController.register);
router.post('/login', authController.login);
router.post('/reset-password', authMiddleware, authController.resetPassword);

module.exports = router;