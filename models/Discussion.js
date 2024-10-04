const mongoose = require("mongoose");

const discussionSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: [true, "Please provide discussion content"],
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
        content: {
          type: String,
          required: [true, "Please provide reply content"],
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
  { timestamps: true }
);

module.exports = mongoose.model("Discussion", discussionSchema);
