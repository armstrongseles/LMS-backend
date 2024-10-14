const express = require('express');// Add this line
const router = express.Router();
const Enrollment = require('../models/Enrollment'); 
const mongoose = require('mongoose');
// Route to get enrollment by userId
router.get('/:userId', async (req, res) => {
    try {
      const userId = req.params.userId;
  
// Now use the correct ObjectId in the query
const enrollment = await Enrollment.find({ userId: userId }); // Don't convert userId to ObjectId

        console.log(enrollment);
        
      if (enrollment.length === 0) {
        return res.status(404).json({ message: 'No enrollments found for this user' });
      }
      
      // Process the enrollments array
      res.json(enrollment);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
// GET route to fetch enrolled courses by userId
router.get('/enrolledCourses/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        // Find enrollments for the given userId
        const enrollments = await Enrollment.find({ userId: userId }).populate('courseId');
        
        if (enrollments.length === 0) {
            return res.status(404).json({ message: 'No enrollments found for this user' });
        }

        res.json(enrollments);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});


// Enroll in a course
router.post('/enroll', async (req, res) => {
  const { courseId, userId } = req.body;

  try {
    // Check if the user is already enrolled in the course
    const existingEnrollment = await Enrollment.findOne({ courseId, userId });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Already enrolled in this course.' });
    }

    // Create a new enrollment if not already enrolled
    const enrollment = new Enrollment({
      courseId,
      userId,
      enrollmentDate: new Date(),
    });

    await enrollment.save();
    res.status(201).json({ message: 'Enrollment successful', enrollment });
  } catch (error) {
    console.error("Enrollment error:", error);
    res.status(500).json({ error: 'Enrollment failed, please try again.' });
  }
});
// POST route for submitting assessment
// Route for submitting assessment by userId
router.post('/:userId/submit-assessment', async (req, res) => {
    const { userId } = req.params;
    const { courseId, marksObtained, status } = req.body;

    try {
        // Ensure userId is treated as ObjectId
        const userObjectId = new mongoose.Types.ObjectId(userId);

        // Find the enrollment by userId and courseId (if relevant)
        const enrollment = await Enrollment.findOneAndUpdate(
            { userId: userObjectId, courseId: courseId },  // Assuming you want to filter by courseId as well
            { marksObtained, status: status || 'Completed' },  // Update the assessment details
            { new: true }
        );

        if (!enrollment) {
            return res.status(404).json({ message: 'Enrollment not found for this user and course' });
        }

        res.status(200).json({ message: 'Assessment submitted successfully', enrollment });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
