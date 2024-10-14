const express = require('express');
const multer = require('multer');
const path = require('path');
const Car = require('../models/carModel');
const Review = require('../models/reviewModel');
const router = express.Router();

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Route to post a new car
router.post('/cars', upload.single('image'), async (req, res) => {
  try {
    const { carType, carModel, pricePerHour, availability } = req.body;
    const image = req.file.path;

    const newCar = new Car({ carModel, pricePerHour, availability, image,carType });
    await newCar.save();

    res.status(201).json(newCar);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get all cars
router.get('/cars', async (req, res) => {
  try {
    const cars = await Car.find();
    res.status(200).json(cars);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to get a specific car by ID
router.get('/cars/:id', async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ error: 'Car not found' });
    }
    res.status(200).json(car);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Route to submit a new review
router.post('/reviews', async (req, res) => {
  const { carId, userId, rating, review } = req.body;

  try {
    const newReview = new Review({ carId, userId, rating, review });
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Route to get reviews for a specific car
router.get('/reviews/:carId', async (req, res) => {
  try {
    const reviews = await Review.find({ carId: req.params.carId }).populate('userId', 'email');
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;