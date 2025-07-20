const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  reviewRound: { type: mongoose.Schema.Types.ObjectId, ref: 'ReviewRound', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  reviewer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  rubricScores: [{
    rubric: { type: mongoose.Schema.Types.ObjectId, ref: 'Rubric' },
    score: { type: Number, min: 0 }
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Reviews', reviewSchema);