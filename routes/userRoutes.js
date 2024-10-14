const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;

// Registration route
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Login route
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }
    const payload = { user: { id: user.id } };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '15m' }); // Set token expiration to 15 minutes
    res.json({ token, userId: user.id }); // Ensure userId is included in the response
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user details
router.get('/me', authMiddleware, (req, res) => {
  res.json({
    email: req.user.email,
  });
});

module.exports = router;