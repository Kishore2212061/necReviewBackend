const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  registerNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: [{ type: String, enum: ['admin', 'guide', 'reviewer', 'student'] }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);