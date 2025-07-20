const GuideFeedback = require('../models/guideFeedback.model');

exports.submitFeedback = async (req, res) => {
  const { teamId, feedbackText, allowReview } = req.body;
  try {
    const feedback = await GuideFeedback.findOne({ team: teamId, guide: req.user.id });
    if (feedback && feedback.isLocked) {
      return res.status(403).json({ message: 'Feedback is locked by admin' });
    }
    if (feedback) {
      feedback.feedbackText = feedbackText;
      feedback.allowReview = allowReview;
      await feedback.save();
      res.json({ message: 'Feedback updated successfully', feedback });
    } else {
      const newFeedback = new GuideFeedback({
        team: teamId,
        guide: req.user.id,
        feedbackText,
        allowReview
      });
      await newFeedback.save();
      res.status(201).json({ message: 'Feedback submitted successfully', feedback: newFeedback });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.lockFeedback = async (req, res) => {
  const { feedbackId, isLocked } = req.body;
  try {
    const feedback = await GuideFeedback.findById(feedbackId);
    if (!feedback) {
      return res.status(404).json({ message: 'Feedback not found' });
    }
    feedback.isLocked = isLocked;
    await feedback.save();
    res.json({ message: 'Feedback lock status updated', feedback });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getFeedback = async (req, res) => {
  const { teamId } = req.params;
  try {
    const feedback = await GuideFeedback.findOne({ team: teamId }).populate('guide');
    res.json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};