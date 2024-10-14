// src/models/Enrollment.js

const mongoose = require('mongoose');

// Define the enrollment schema
const enrollmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    courseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    marksObtained: { type: Number, default: 0 },
    totalMarks: { type: Number, default: 0 },
    status: { 
        type: String, 
        enum: ['Completed', 'In Progress'], 
        default: 'In Progress' 
    },
}, { collection: 'enrollments' }); 

// Export the Enrollment model
const Enrollment= mongoose.model('Enrollment', enrollmentSchema);
module.exports =Enrollment;
