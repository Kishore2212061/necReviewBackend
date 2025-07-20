const express = require('express');
const router = express.Router();
const reviewRoundController = require('../controllers/reviewRound.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), reviewRoundController.createReviewRound);
router.get('/:teamId', authMiddleware, reviewRoundController.getReviewRounds);

module.exports = router;