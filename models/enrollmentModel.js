const mongoose = require('mongoose');

const enrollmentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true,
  },
  marksObtained: {
    type: Number,
    default: 0,
  },
  totalMarks: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    default: 'Ongoing',
  }
});

// Use the existing model if it has already been compiled, otherwise create it
const Enrollment = mongoose.models.Enrollment || mongoose.model('Enrollment', enrollmentSchema);

module.exports = Enrollment;
