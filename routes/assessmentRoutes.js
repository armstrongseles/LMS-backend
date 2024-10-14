// backend/routes/assessmentRoutes.js
const express = require('express');
const router = express.Router();
const Enrollment = require('../models/enrollmentModel'); // Assuming the Enrollment model exists

// Submit assessment route
router.post('/:courseId/submit-assessment', async (req, res) => {
  const { courseId } = req.params;
  const { userId, marksObtained, totalMarks, status } = req.body;

  try {
    const enrollment = await Enrollment.findOne({ courseId, userId });
    if (!enrollment) {
      return res.status(404).json({ message: 'Enrollment not found' });
    }

    // Update the enrollment with the assessment result
    enrollment.marksObtained = marksObtained;
    enrollment.totalMarks = totalMarks;
    enrollment.status = status;

    await enrollment.save();
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: 'Error submitting assessment' });
  }
});

module.exports = router;
