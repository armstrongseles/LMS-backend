// server/models/UserCourses.js
const mongoose = require('mongoose');

const userCoursesSchema = new mongoose.Schema({
  userEmail: { type: String, required: true },
  courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
  enrollmentDate: { type: Date, default: Date.now },
  testCompleted: { type: Boolean, default: false },
});

module.exports = mongoose.model('UserCourses', userCoursesSchema);
