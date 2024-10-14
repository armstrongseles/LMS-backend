const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  // Add any other fields relevant to your course
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
