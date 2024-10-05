const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide name"],
    },
    imageUrl: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please provide email"],
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Please provide a valid email",
      ],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please provide password"],
      minlength: [8,"Passowrd needs to be at least 8 chararcters"], //check why it isnt working
    },
    joinedCourses: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Course",
      },
    ],
    role: {
      type: String,
      enum: ["Student", "Instructor", "Admin"],
      required: [true, "Please provide role"],
    },
  },
  { timestamps: true }
);
userSchema.index({ role: 1, email: 1 });

module.exports = mongoose.model("User", userSchema);
