// routes/enrolledCourses.js
const express = require('express');
const router = express.Router();
const Course = require('../models/course'); // Adjust the path if needed

// Fetch enrolled courses for a user
router.get('/enrolledCourses/:userId', async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find courses where the user is enrolled
    const courses = await Course.find({ enrolledUsers: userId }).populate('enrolledUsers');

    if (!courses.length) {
      return res.status(404).json({ message: 'No enrolled courses found for this user' });
    }

    res.status(200).json(courses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
