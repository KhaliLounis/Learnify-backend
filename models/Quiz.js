const mongoose = require("mongoose");

const quizSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  questions: [
    {
      questionTitle: String,
      answers: [String],
      correctAnswer: String,
    },
  ],
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  duration: {
    type: Number,
  },
  submittedAnswers: [
    {
      submittedAnswers: [String],
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      submitDate: Date,
      score: { type: Number, default: 0 },
    },
  ],
});

module.exports = mongoose.model("Quiz", quizSchema);
