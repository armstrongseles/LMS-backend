const express = require('express');
const Review = require('../models/reviewModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new review
router.post('/reviews', authMiddleware, async (req, res) => {
  try {
    const { carId, rating, review } = req.body;
    const userId = req.user.id; // Get userId from middleware

    const newReview = new Review({ carId, userId, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ error: err.message });  // Changed to 400 for validation errors
  }
});

// Get reviews for a car
router.get('/reviews/:carId', async (req, res) => {
  try {
    const reviews = await Review.find({ carId: req.params.carId }).populate('userId', 'email');
    res.status(200).json(reviews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;