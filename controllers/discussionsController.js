const Discussion = require("../models/Discussion");
const getDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const discussion = await Discussion.findById(discussionId).populate([
    { path: "userId", select: "name" },
    { path: "upvotes", select: "name" },
    { path: "replies.userId", select: "name" },
  ]);
  if (!discussion) {
    return res
      .status(404)
      .json({ message: "No dicsussion found with this id" });
  }
  return res.status(200).json(discussion);
};

const createDiscussion = async (req, res) => {
  const { content } = req.body;
  const { userId } = req.user;
  const { courseId } = req.params;
  if (!content) {
    return res
      .status(400)
      .json({ message: "Please provide the discussion's content" });
  }
  const discussion = await Discussion.create({ content, userId, courseId });
  res
    .status(201)
    .json({ message: "Discussion created successfully", discussion });
};
const updateDiscussion = async (req, res) => {
  const { content } = req.body;
  const { userId } = req.user;
  const { discussionId } = req.params;
  if (!content) {
    return res
      .status(400)
      .json({ message: "Please provide the discussion's content" });
  }
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    return res
      .status(404)
      .json({ message: "No discussion found with this id" });
  }
  if (discussion.userId.toString() !== userId) {
    return res.status(403).json({
      message: "Only the dicussion creator can update the discussion",
    });
  }
  discussion.content = content;
  await discussion.save();
  res
    .status(201)
    .json({ message: "Discussion updated successfully", discussion });
};
const deleteDiscussion = async (req, res) => {
  const { discussionId } = req.params;
  const { userId } = req.user;
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    return res
      .status(404)
      .json({ message: "No discussion found with this id" });
  }
  if (discussion.userId.toString() !== userId) {
    return res.status(403).json({
      message: "Only the dicussion creator can update the discussion",
    });
  }
  await Discussion.deleteOne(discussionId);

  res.status(200).json({ message: "discussion deleted successfully" });
};
const upvoteDiscussion = async (req, res) => {
  const { userId } = req.user;
  const { discussionId } = req.params;
  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    return res.status(404).json({ message: "Discussion not found" });
  }

  if (discussion.upvotes.includes(userId)) {
    await Discussion.updateOne(
      { _id: discussionId },
      {
        $pull: { upvotes: userId },
      },
      { new: true, runValidators: true }
    );
    return res
      .status(200)
      .json({ message: "Removed upvote from post successfully" });
  } else {
    await Discussion.updateOne(
      { _id: discussionId },
      {
        $addToSet: { upvotes: userId },
      },
      { new: true, runValidators: true }
    );
    return res.status(200).json({ message: "Upvoted post successfully" });
  }
};
const replyToDiscussion = async (req, res) => {
  const { userId } = req.user;
  const { discussionId } = req.params;
  const { replyText } = req.body;

  const discussion = await Discussion.findById(discussionId);
  if (!discussion) {
    return res
      .status(404)
      .json({ message: "No discussion found with this id" });
  }
  discussion.replies.push({ userId, replyText });
  await discussion.save();
  return res
    .status(200)
    .json({ message: "Reply added to discussion successfully." });
};

module.exports = {
  getDiscussion,
  createDiscussion,
  updateDiscussion,
  deleteDiscussion,
  upvoteDiscussion,
  replyToDiscussion,
};
