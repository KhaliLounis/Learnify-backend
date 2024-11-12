const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true,
    },
    courseId: {
      type: mongoose.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      required: true,
    },
    replies: [
      {
        userId: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        replyText: {
          type: String,
          required: [true, "Please provide reply text"],
        },
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    upvotes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true },
);

module.exports = mongoose.model("Discussion", discussionSchema);
