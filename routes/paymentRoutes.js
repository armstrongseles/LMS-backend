// routes/paymentRoutes.js
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/Enrollment'); // Import the Enrollment model
const Razorpay = require('razorpay'); // Import Razorpay
const { v4: uuidv4 } = require('uuid'); // For generating unique order IDs

// Configure Razorpay
const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, // Replace with your Razorpay key ID
    key_secret: process.env.RAZORPAY_KEY_SECRET // Replace with your Razorpay key secret
});

// POST /api/enroll
router.post('/enroll', async (req, res) => {
    const { courseId, userId } = req.body;

    try {
        // Check if already enrolled
        const existingEnrollment = await Enrollment.findOne({ courseId, userId });
        if (existingEnrollment) {
            return res.status(400).json({ error: 'Already enrolled in this course.' });
        }

        // Create a new enrollment
        const newEnrollment = new Enrollment({ courseId, userId });
        await newEnrollment.save();

        return res.status(201).json({ message: 'Enrollment successful', enrollment: newEnrollment });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: 'Enrollment failed, please try again.' });
    }
});

// POST /api/payment
router.post('/payment', async (req, res) => {
  const { amount, currency, receipt } = req.body;
  console.log("Razorpay Key ID:", process.env.RAZORPAY_KEY_ID);
console.log("Razorpay Key Secret:", process.env.RAZORPAY_KEY_SECRET);

  console.log("Payment request received:", { amount, currency, receipt });

  try {
      const options = {
          amount: amount * 100, // Amount in paise
          currency: currency,
          receipt: receipt || uuidv4(), // Generate a unique receipt ID
      };

      const order = await razorpay.orders.create(options);
      console.log("Order created successfully:", order);

      return res.status(201).json({ orderId: order.id, currency: order.currency, amount: order.amount });
  } catch (err) {
      console.error("Payment initiation error:", err);
      return res.status(500).json({ error: 'Payment initiation failed, please try again.' });
  }
});


// Verify payment
router.post('/verify', (req, res) => {
    const { orderId, paymentId, signature } = req.body;

    const expectedSignature = crypto
        .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
        .update(orderId + '|' + paymentId)
        .digest('hex');

    if (signature === expectedSignature) {
        return res.status(200).json({ message: 'Payment verified' });
    } else {
        return res.status(400).json({ message: 'Payment verification failed' });
    }
});

module.exports = router;
