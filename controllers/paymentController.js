// server/controllers/paymentController.js
const crypto = require('crypto');
const UserCourses = require('../models/UserCourses'); // Adjust the path as necessary

const handlePaymentVerification = async (req, res) => {
  const { orderId, paymentId, razorpay_signature, userEmail, courseId } = req.body;
  
  const shasum = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  shasum.update(`${orderId}|${paymentId}`);
  const digest = shasum.digest("hex");

  if (digest === razorpay_signature) {
    try {
      // Save the enrollment in the database
      const enrollment = new UserCourses({
        userEmail,
        courseId,
      });
      await enrollment.save();

      return res.status(200).json({ message: "Enrollment successful" });
    } catch (error) {
      console.error("Failed to save enrollment:", error);
      return res.status(500).json({ message: "Failed to save enrollment", error });
    }
  } else {
    return res.status(400).json({ message: "Invalid signature" });
  }
};

module.exports = { handlePaymentVerification };
