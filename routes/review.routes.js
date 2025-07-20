const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['reviewer']), reviewController.submitReview);
router.get('/:reviewRoundId', authMiddleware, reviewController.getReviews);

module.exports = router;