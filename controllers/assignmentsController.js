const Assignment = require("../models/Assignment");
const Module = require("../models/Module");
const User = require("../models/User");
const getAssignment = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getModuleAssignments = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createAssignment = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateAssignment = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteAssignment = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitAssignment = (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getAssignment,
  createAssignment,
  updateAssignment,
  deleteAssignment,
  submitAssignment,
  getModuleAssignments,
};
