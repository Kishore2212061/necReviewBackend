const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewRound: { type: mongoose.Schema.Types.ObjectId, ref: 'ReviewRound', required: true },
  team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rubricScores: [{
    rubric: { type: mongoose.Schema.Types.ObjectId, ref: 'Rubric', required: true },
    score: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Review', reviewSchema);