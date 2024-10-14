// routes/enroll.js
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Course = require('../models/course');
const Enrollment = require('../models/Enrollment');  // Assuming this model stores enrolled courses

// Route to get the courses enrolled by a specific user
router.get('/enrolledCourses/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // Fetch enrollments for the user
    const enrollments = await Enrollment.find({ userId }).populate('courseId'); // Assuming 'courseId' references the course

    // If no enrollments found, return an empty array
    if (!enrollments || enrollments.length === 0) {
      return res.status(404).json({ error: 'No enrollments found for this user.' });
    }

    // Send the list of enrolled courses
    res.json(enrollments.map(enrollment => enrollment.courseId));
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    res.status(500).json({ error: 'Failed to fetch enrolled courses.' });
  }
});
// Enroll a user in a course
router.post('/enroll', async (req, res) => {
    const { courseId, userId } = req.body;
  
    try {
      // Check if the user is already enrolled in the course (optional but recommended)
      const existingEnrollment = await Enrollment.findOne({ courseId, userId });
      if (existingEnrollment) {
        return res.status(400).json({ message: 'User is already enrolled in this course' });
      }
  
      // Create a new enrollment record
      const newEnrollment = new Enrollment({
        userId: new mongoose.Types.ObjectId(userId), // Ensure it's an ObjectId
        courseId: new mongoose.Types.ObjectId(courseId), // Ensure it's an ObjectId
        marksObtained: 0,
        totalMarks: 100,
        status: 'In Progress'
      });
  
      // Save the enrollment
      const savedEnrollment = await newEnrollment.save();
      res.status(200).json({ message: 'Enrollment successful', enrollment: savedEnrollment });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  module.exports = router;
