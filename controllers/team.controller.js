const Team = require('../models/team.model');

exports.createTeam = async (req, res) => {
  const { name, guide, reviewers, students } = req.body;
  try {
    const team = new Team({ name, guide, reviewers, students });
    await team.save();
    res.status(201).json({ message: 'Team created successfully', team });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getTeams = async (req, res) => {
  try {
    const user = req.user;
    let query = {};
    if (user.roles.includes('guide')) {
      query.guide = user.id;
    } else if (user.roles.includes('reviewer')) {
      query.reviewers = user.id;
    } else if (user.roles.includes('student')) {
      query.students = user.id;
    }
    const teams = await Team.find(query).populate('guide reviewers students');
    res.json(teams);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};