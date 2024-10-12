const mongoose = require("mongoose");
const User = require("./User");
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide title"],
    },
    description: {
      type: String,
    },
    level: {
      type: String,
    },
    imageUrl: {
        type:String
    },
    moduleIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Module",
      },
    ],
    assignmentIds: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Assignment",
      },
    ],
    discussion :{
        type: mongoose.Types.ObjectId,
        ref: "Discussion",
    },
    instructorId: {
      type: mongoose.Types.ObjectId,
      ref: "User",
      validate: {
        validator: async function (value) {
          const user = await User.findById(value);
          return user && user.role === "Instructor";
        },
        message:
          "Instructor ID must belong to a user with the 'Instructor' role",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
