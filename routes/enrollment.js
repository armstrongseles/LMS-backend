const express = require('express');
const mongoose = require('mongoose'); // Add this line
const router = express.Router();
const Enrollment = require('../models/Enrollment'); // Adjust the path as necessary


// POST route for submitting assessment
router.post('/:userId/submit-assessment', async (req, res) => {
  const userId = req.params.userId; // Extract the userId from the URL
  const { marksObtained, totalMarks, status } = req.body;

  try {
    // Find the enrollment record for the user
    const userObjectId = new mongoose.Types.ObjectId(userId);


    const enrollment = await Enrollment.findOne({ _id: userObjectId });
    console.log(userId);
    console.log(enrollment);
    // Check if enrollment record exists
    if (!enrollment) {
      
      return res.status(404).json({ error: 'Enrollment not found' });
    }

    // Update the enrollment record with the assessment results
    enrollment.marksObtained = marksObtained;
    enrollment.totalMarks = totalMarks;
    enrollment.status = status; // 'Completed' or 'In Progress'
    await enrollment.save();

    res.status(200).json({ message: 'Assessment submitted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while submitting the assessment' });
  }
});

module.exports = router;
