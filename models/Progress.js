const mongoose = require("mongoose");

const progressSchema = new mongoose.Schema({
  completedModulesIds: [
    {
      type: mongoose.Types.ObjectId,
      ref: "Module",
    },
  ],
  userId: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  quizScores: [
    {
      quizId: {
        type: mongoose.Types.ObjectId,
        ref: "Quiz",
        required: true,
      },
      score: Number,
    },
  ],
  courseCompletion: {
    type: Boolean,
    default: false, 
  },
});

module.exports = mongoose.model("Progress", progressSchema);
