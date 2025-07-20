const ReviewRound = require('../models/reviewRound.model');
const Rubric = require('../models/rubric.model');

exports.createReviewRound = async (req, res) => {
  const { name, rubrics } = req.body;
  try {
    // Validate that exactly three rubrics are provided and their max scores total 100
    if (!rubrics || rubrics.length !== 3) {
      return res.status(400).json({ message: 'Exactly three rubrics are required' });
    }
    const rubricDocs = await Rubric.find({ _id: { $in: rubrics } });
    if (rubricDocs.length !== 3) {
      return res.status(404).json({ message: 'One or more rubrics not found' });
    }
    const totalScore = rubricDocs.reduce((sum, rubric) => sum + rubric.maxScore, 0);
    if (totalScore !== 100) {
      return res.status(400).json({ message: 'Rubric max scores must total exactly 100' });
    }
    const reviewRound = new ReviewRound({ name, rubrics });
    await reviewRound.save();
    res.status(201).json({ message: 'Review round created successfully', reviewRound });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getReviewRounds = async (req, res) => {
  try {
    const reviewRounds = await ReviewRound.find().populate('rubrics');
    res.json(reviewRounds);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};