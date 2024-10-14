// models/course.js
const mongoose = require('mongoose');

// Define course schema
const courseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  assessments: [
    {
      question: {
        type: String,
        required: true,
      },
      options: {
        type: [String],
        required: true,
      },
      answer: {
        type: String,
        required: true,
      },
    },
  ],
});

// Create course model
const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
