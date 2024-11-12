const Course = require("../models/Course");
const Module = require("../models/Module");
const Quiz = require("../models/Quiz");
const Discussion = require("../models/Discussion");
const User = require("../models/User");
const getCourse = async (req, res) => {
  const { courseId } = req.params;
  const course = await Course.findById(courseId).populate([
    { path: "discussionIds" },
    { path: "moduleIds" },
    { path: "assignmentIds" },
    { path: "instructorId" },
  ]);

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
  ("");
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
    },
  );
  res.status(200).json(course);
};
const deleteCourse = async (req, res) => {
  const { courseId } = req.params;
  const { userId } = req.user;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course was not found" });
  }
  if (course.instructorId.toString() !== userId) {
    return res
      .status(403)
      .json({ message: "Only the course's instructor can delete it" });
  }
  await Module.deleteMany({ courseId });
  await Quiz.deleteMany({ courseId });
  await Discussion.deleteMany({ courseId });

  await Course.deleteOne({ _id: courseId });
  return res.status(200).json({
    message: "Course and its associated resources deleted successfully",
  });
};
const getUserCourses = async (req, res) => {
  const { userId } = req.user;
  const courses = await User.findById(userId)
    .populate("joinedCourses")
    .select("joinedCourses");
  res.status(200).json(courses);
};
const enrollInCourse = async (req, res) => {
  const { userId, level, role } = req.user;
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (course.level !== level) {
    return res.status(403).json({ message: "You can't enroll in this course" });
  }
  if (role !== "Student") {
    return res
      .status(403)
      .json({ message: "Only students can enroll in courses" });
  }
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: { joinedCourses: courseId },
    },
    { new: true, runValidators: true },
  );
  res.status(200).json({ message: "Enrolled successfully" });
};
const unenrollInCourse = async (req, res) => {
  const { userId } = req.user;
  const { courseId } = req.params;
  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({ message: "Course not found" });
  }
  if (role !== "Student") {
    return res
      .status(403)
      .json({ message: "Only students can unenroll from courses" });
  }
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: { joinedCourses: courseId },
    },
    { new: true, runValidators: true },
  );
  res.status(200).json({ message: "Unenrolled successfully" });
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
