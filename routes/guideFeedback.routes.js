const express = require('express');
const router = express.Router();
const guideFeedbackController = require('../controllers/guideFeedback.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['guide']), guideFeedbackController.submitFeedback);
router.post('/lock', authMiddleware, roleMiddleware(['admin']), guideFeedbackController.lockFeedback);
router.get('/:teamId', authMiddleware, guideFeedbackController.getFeedback);

module.exports = router;