const Rubric = require('../models/rubric.model');

exports.createRubric = async (req, res) => {
  const { name, description, maxScore } = req.body;
  try {
    const rubric = new Rubric({ name, description, maxScore });
    await rubric.save();
    res.status(201).json({ message: 'Rubric created successfully', rubric });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getRubrics = async (req, res) => {
  try {
    const rubrics = await Rubric.find();
    res.json(rubrics);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};