const mongoose = require("mongoose");

const assignmentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please provide title"],
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
    required: [true, "Please provide the deadline date"],
  },
  courseId: {
    type: mongoose.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  submittedFiles: [
    {
      fileUrl: String,
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      submitDate: Date,
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
