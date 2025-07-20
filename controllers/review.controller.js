const Review = require('../models/review.model');
const GuideFeedback = require('../models/guideFeedback.model');
const Rubric = require('../models/rubric.model');

exports.submitReview = async (req, res) => {
  const { reviewRoundId, teamId, studentId, rubricScores } = req.body;
  try {
    const feedback = await GuideFeedback.findOne({ team: teamId });
    if (!feedback?.allowReview) {
      return res.status(403).json({ message: 'Review not allowed until guide permits' });
    }
    for (const score of rubricScores) {
      const rubric = await Rubric.findById(score.rubric);
      if (!rubric) {
        return res.status(404).json({ message: `Rubric ${score.rubric} not found` });
      }
      if (score.score > rubric.maxScore || score.score < 0) {
        return res.status(400).json({ message: `Score for ${rubric.name} must be between 0 and ${rubric.maxScore}` });
      }
    }
    const review = new Review({
      reviewRound: reviewRoundId,
      team: teamId,
      student: studentId,
      reviewer: req.user.id,
      rubricScores
    });
    await review.save();
    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getReviews = async (req, res) => {
  const { reviewRoundId, teamId } = req.params;
  try {
    const reviews = await Review.find({ reviewRound: reviewRoundId, team: teamId })
      .populate('student reviewer rubricScores.rubric');
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};