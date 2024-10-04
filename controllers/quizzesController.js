const Quiz = require("../models/Quiz");
const Module = require("../models/Module");
const User = require("../models/User");
const getQuiz = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getModuleQuizzes = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createQuiz = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateQuiz = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteQuiz = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitQuiz = (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
  getModuleQuizzes,
};
