const Progress = require("../models/Progress");
const Module = require("../models/Module");
const User = require("../models/User");
const getProgress = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createProgress = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateProgress = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteProgress = async (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
};
