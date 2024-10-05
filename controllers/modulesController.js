const Module = require("../models/Module");
const Course = require("../models/Course");
const getModule = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getCourseModules = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createModule = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateModule = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteModule = async (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getModule,
  createModule,
  updateModule,
  deleteModule,
  getCourseModules,
};
