const Enrollment = require('../models/Enrollment'); // Adjust based on your actual model

const getEnrollmentStatus = async (req, res) => {
  const { userId } = req.params;

  try {
    const enrollments = await Enrollment.find({ userId }).populate('courseId'); // Adjust the model based on your schema
    res.status(200).json(enrollments);
  } catch (error) {
    console.error("Error fetching enrollment status:", error);
    res.status(500).json({ error: "Failed to fetch enrollment status" });
  }
};
module.exports = { getEnrollmentStatus };