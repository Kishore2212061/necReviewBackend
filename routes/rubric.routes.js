const express = require('express');
const router = express.Router();
const rubricController = require('../controllers/rubric.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), rubricController.createRubric);
router.get('/', authMiddleware, rubricController.getRubrics);

module.exports = router;