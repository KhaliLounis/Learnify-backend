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
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: "Module",  
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
  },
  duration: {
    type: Number,
  },
});

module.exports = mongoose.model("Quiz", quizSchema);
