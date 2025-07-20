const mongoose = require('mongoose');

const reviewRoundSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rubrics: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rubric', required: true }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ReviewRound', reviewRoundSchema);