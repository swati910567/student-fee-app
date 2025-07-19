const express = require("express");
const router = express.Router();
const auth = require("../middleware/authMiddleware");
const Student = require("../models/Student");

// @route   GET api/students
// @desc    Get all students
router.get("/", async (req, res) => {
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
router.get("/profile", auth, async (req, res) => {
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
router.put("/profile", auth, async (req, res) => {
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
router.post("/pay", auth, async (req, res) => {
  try {
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

module.exports = router;
