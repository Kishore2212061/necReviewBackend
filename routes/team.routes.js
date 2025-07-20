const express = require('express');
const router = express.Router();
const teamController = require('../controllers/team.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const roleMiddleware = require('../middlewares/role.middleware');

router.post('/', authMiddleware, roleMiddleware(['admin']), teamController.createTeam);
router.get('/', authMiddleware, teamController.getTeams);

module.exports = router;