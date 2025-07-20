const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/user.model');
const { connectDB } = require('./config/db');
require('dotenv').config();

const initAdmin = async () => {
  try {
    await connectDB();
    const adminExists = await User.findOne({ roles: 'admin' });
    if (adminExists) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    const password = bcrypt.hashSync('admin123', 10);
    const admin = new User({
      registerNumber: 'ADMIN001',
      email: 'admin@example.com',
      password,
      roles: ['admin','guide','reviewer']
    });
    await admin.save();
    console.log('Admin user created successfully');
    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

initAdmin();