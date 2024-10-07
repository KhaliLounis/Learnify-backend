const Quiz = require("../models/Quiz");
const Module = require("../models/Module");
const User = require("../models/User");
const getQuiz = async (req, res) => {
  res.status(200).json({ message: "yes" });
};

const createQuiz = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateQuiz = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteQuiz = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitQuiz = async (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};
