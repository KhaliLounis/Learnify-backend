const Course = require("../models/Course");
const User = require("../models/User");
const getCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId); //the populate
  if (!course) {
    return res.status(404).json({ message: "course not found" });
  }
  res.status(200).json(course);
};
const createCourse = async (req, res) => {
  const { title, description, level } = req.body;
  const { role, userId: instructorId } = req.user;
  if (!title || !level) {
    return res.status(400).json({
      message: "Please provide the course's title and level",
    });
  }
  if (role !== "Instructor") {
    return res
      .status(403)
      .json({ message: "Only instructors can create courses " });
  }
  const course = await Course.create({
    title,
    description,
    level,
    instructorId,
  });
  res.status(201).json(course);
};
const updateCourse = async (req, res) => {
  const { courseId } = req.params;
  const { title, description, level } = req.body;
  const { role } = req.user;
  if (!title || !level) {
    return res.status(400).json({
      message: "Please provide the course's title and level",
    });
  }

  if (role !== "Instructor") {
    return res
      .status(403)
      .json({ message: "Only instructors can edit courses " });
  }
  const course = await Course.findByIdAndUpdate(
    courseId,
    {
      title,
      description,
      level,
    },
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(200).json(course);
};
const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const { role } = req.user;
  if (role !== "Instructor") {
    return res
      .status(403)
      .json({ message: "Only instructors can delete courses " });
  }
  const course = await Course.findByIdAndDelete(courseId);
  res.status(200).json({ message: "Course deleted successfully" });
};
const getUserCourses = async (req, res) => {
  const { userId } = req.user;
  const courses = await User.findById(userId)
    .populate("courses")
    .select("courses");
  res.status(200).json(courses);
};
const enrollInCourse = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const unenrollInCourse = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
module.exports = {
  getCourse,
  createCourse,
  updateCourse,
  deleteCourse,
  getUserCourses,
  enrollInCourse,
  unenrollInCourse,
};
