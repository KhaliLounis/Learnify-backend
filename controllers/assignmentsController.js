const Assignment = require("../models/Assignment");
const Module = require("../models/Module");
const User = require("../models/User");
const getAssignment = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getModuleAssignments = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createAssignment = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateAssignment = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteAssignment = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitAssignment = async (req, res) => {
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
