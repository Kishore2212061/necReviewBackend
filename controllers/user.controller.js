const User = require('../models/user.model');
const bcrypt = require('bcryptjs');

exports.bulkAddUsers = async (req, res) => {
  const { users } = req.body; // Array of { registerNumber, email, roles }
  try {
    const result = [];
    for (const userData of users) {
      const { registerNumber, email, roles } = userData;
      const existingUser = await User.findOne({ $or: [{ registerNumber }, { email }] });
      if (existingUser) {
        result.push({ registerNumber, status: 'failed', message: 'User already exists' });
        continue;
      }
      const password = bcrypt.hashSync(registerNumber, 10);
      const user = new User({ registerNumber, email, password, roles });
      await user.save();
      result.push({ registerNumber, status: 'success' });
    }
    res.status(201).json({ message: 'Bulk add completed', result });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getCurrentUser = (req, res) => {
  res.json(req.user); // ✅ Already populated in authMiddleware
};
