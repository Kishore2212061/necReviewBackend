// createAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const connectDB = require('./config/db');

const createAdmin = async () => {
  await connectDB();

  const existing = await User.findOne({ email: 'admin@example.com' });
  if (existing) {
    console.log('Admin already exists!');
    return process.exit(0);
  }

  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = new User({
    registerNumber: '0000000',
    name: 'Super Admin',
    email: 'admin@example.com',
    password: hashedPassword,
    roles: ['admin'],
    mustResetPassword: false
  });

  await admin.save();
  console.log('✅ Admin created! Email: admin@example.com | Password: admin123');
  process.exit(0);
};

createAdmin();
