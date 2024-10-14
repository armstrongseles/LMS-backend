// server/server.js
const express = require('express');
const mongoose = require('mongoose');
const carRoutes = require('./routes/carRoutes');
const userRoutes = require('./routes/userRoutes');
const bookingRoutes = require('./routes/bookingcarRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const paymentRoutes = require('./routes/paymentRoutes'); // Payment routes
const courseRoutes = require('./routes/courseRoutes');
const assessmentRoutes = require('./routes/assessmentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes'); // For enrollment and assessment submission
const enrollRoutes = require('./routes/enroll'); // Ensure this file exists

const path = require('path');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;

// Middleware for JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// API routes
app.use('/api/cars', carRoutes); // Car-related routes
app.use('/api/auth', userRoutes); // Authentication routes
app.use('/api/bookings', bookingRoutes); // Booking routes
app.use('/api/reviews', reviewRoutes); // Review routes
app.use('/api/', courseRoutes); // Course routes
app.use('/api', enrollRoutes);
app.use('/api/payments', paymentRoutes); // Payment routes
app.use('/api/enrollment', enrollmentRoutes); // Enrollment-related routes
app.use('/api/assessment', assessmentRoutes); // Assessment-related routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// MongoDB connection
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

mongoose.connection.on('error', (err) => {
  console.error('Error connecting to MongoDB:', err);
});
