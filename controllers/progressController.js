const Progress = require("../models/Progress");
const Module = require("../models/Module");
const User = require("../models/User");
const getProgress = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createProgress = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateProgress = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteProgress = (req, res) => {
  res.status(200).json({ message: "yes" });
};


module.exports = {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
};
