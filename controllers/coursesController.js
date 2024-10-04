const Course = require("../models/Course");
const User = require("../models/User");
const getCourse = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getUserCourses = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createCourse = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateCourse = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteCourse = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const enrollInCourse = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const unenrollInCourse = (req, res) => {
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
