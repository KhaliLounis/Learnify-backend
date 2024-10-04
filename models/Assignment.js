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
  moduleId: {
    type: mongoose.Types.ObjectId,
    ref: "Module",
    required:true
  },
  submittedFiles: [
    {
      fileUrl: String,
      userId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
      submittedOn: Date,
    },
  ],
});

module.exports = mongoose.model("Assignment", assignmentSchema);
