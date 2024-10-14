// routes/userCoursesRoutes.js
const express = require('express');
const UserCourses = require('../models/UserCourses');
const Course = require('../models/course');
const router = express.Router();

router.get('/enrolled-courses', async (req, res) => {
  const { userEmail } = req.query;
  try {
    const enrolledCourses = await UserCourses.find({ userEmail }).populate('courseId');
    res.status(200).json(enrolledCourses.map(enrollment => enrollment.courseId));
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch enrolled courses' });
  }
});

module.exports = router;
