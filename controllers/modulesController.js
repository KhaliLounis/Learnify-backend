const Module = require("../models/Module");
const Course = require("../models/Course");
const getModule = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getCourseModules = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createModule = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateModule = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteModule = (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getCourseModules,
};
