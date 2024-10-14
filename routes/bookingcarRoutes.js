const express = require('express');
const Booking = require('../models/bookingModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

// Create a new booking
router.post('/bookings', authMiddleware, async (req, res) => {
  try {
    const { carId, startDate, endDate } = req.body;
    const userId = req.user.id;

    const newBooking = new Booking({ carId, userId, startDate, endDate });
    await newBooking.save();
    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all bookings for a user
router.get('/bookings', authMiddleware, async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id }).populate('carId');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Cancel a booking
router.put('/bookings/:id', authMiddleware, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }
    booking.status = 'cancelled';
    await booking.save();
    res.status(200).json(booking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
