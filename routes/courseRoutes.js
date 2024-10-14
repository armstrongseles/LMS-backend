const express = require('express');
const Course = require('../models/courseModel'); // Assuming this is the correct model path
const CourseM = require('../models/courseModel'); 
const router = express.Router();
const { getEnrollmentStatus } = require('../controllers/courseController');

// Fetch all courses
router.get('/courses', async (req, res) => {
  try {
    const courses = await Course.find({}); // Fetch all courses
    res.json(courses); // Respond with the list of courses
  } catch (err) {
    console.error(err); // Log the error to the console
    res.status(500).send(err.message); // Respond with a 500 status and error message
  }
});

// Fetch enrollment status by user ID
router.get('/enrollment/:userId', async (req, res) => {
  console.log('Received request for userId:', req.params.userId);
  await getEnrollmentStatus(req, res); // Call the function directly
});

router.get('/courses/:courseId', async (req, res) => {
    try {
      const course = await CourseM.findById(req.params.courseId); // Ensure this model is correct
      if (!course) {
        return res.status(404).json({ message: 'Course not found' });
      }
      res.json(course);
    } catch (error) {
      console.error('Error fetching course:', error); // Log the error
      res.status(500).json({ message: 'Server error', error: error.message }); // Return more detail in the response
    }
  });
  
  
  

module.exports = router;
