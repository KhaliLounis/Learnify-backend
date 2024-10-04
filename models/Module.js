const mongoose = require("mongoose");

const moduleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  content: [
    {
      title: String,
      files: [String],
      description: String,
    },
  ],
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  quizIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Quiz",
    },
  ],
  resources: [
    {
      type: String, // Links to external resources like readings or videos
    },
  ],
});

module.exports = mongoose.model("Module", moduleSchema);
