// server/routes/students.js
const express = require("express");
const studentsRouter = express.Router();
const auth = require("../middleware/authMiddleware");
const Student = require("../models/Student");

// @route   GET api/students
// @desc    Get all students
studentsRouter.get("/", async (req, res) => {
  try {
    const students = await Student.find().select("-password");
    res.json(students);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   GET api/students/profile
// @desc    Get current student's profile
studentsRouter.get("/profile", auth, async (req, res) => {
  try {
    const student = await Student.findById(req.student.id).select("-password");
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   PUT api/students/profile
// @desc    Update student profile
studentsRouter.put("/profile", auth, async (req, res) => {
  const { name, email } = req.body;
  const profileFields = { name, email };

  try {
    let student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: profileFields },
      { new: true }
    ).select("-password");
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/students/pay
// @desc    Simulate fee payment
studentsRouter.post("/pay", auth, async (req, res) => {
  try {
    // In a real app, you'd process payment here
    let student = await Student.findByIdAndUpdate(
      req.student.id,
      { $set: { feesPaid: true } },
      { new: true }
    ).select("-password");
    res.json(student);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = studentsRouter;
