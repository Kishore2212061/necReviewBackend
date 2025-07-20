const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/bulk-add', authMiddleware, roleMiddleware(['admin']), userController.bulkAddUsers);
router.get('/', authMiddleware, roleMiddleware(['admin']), userController.getUsers);
router.get('/me', authMiddleware, userController.getCurrentUser);
    
module.exports = router;