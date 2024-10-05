const Discussion = require("../models/Discussion");
const Module = require("../models/Module");
const User = require("../models/User");
const getDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getCourseDiscussions = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const upvoteDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const replyToDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitDiscussion = async (req, res) => {
  res.status(200).json({ message: "yes" });
};

module.exports = {
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  upvoteDiscussion,
  replyToDiscussion,
  deleteDiscussion,
};
