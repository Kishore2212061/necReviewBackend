const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth.routes');
const userRoutes = require('./routes/user.routes');
const teamRoutes = require('./routes/team.routes');
const guideFeedbackRoutes = require('./routes/guideFeedback.routes');
const reviewRoundRoutes = require('./routes/reviewRound.routes');
const reviewRoutes = require('./routes/review.routes');
const rubricRoutes = require('./routes/rubric.routes');
const { connectDB } = require('./config/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/guideFeedback', guideFeedbackRoutes);
app.use('/api/reviewRounds', reviewRoundRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/rubrics', rubricRoutes);

module.exports = app;