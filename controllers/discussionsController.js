const Discussion = require("../models/Discussion");
const Module = require("../models/Module");
const User = require("../models/User");
const getDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const getCourseDiscussions = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const createDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const updateDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const upvoteDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const replyToDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const deleteDiscussion = (req, res) => {
  res.status(200).json({ message: "yes" });
};
const submitDiscussion = (req, res) => {
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
