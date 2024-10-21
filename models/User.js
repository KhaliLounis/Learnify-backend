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
      minlength: [8, "Passowrd needs to be at least 8 chararcters"], //check why it isnt working
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
    level: {
      type: String,
      required: function () {
        return this.role === "Student";
      },
      validate: {
        validator: function (value) {
          return this.role === "Student" || value === undefined;
        },
        message: "The 'level' field should only be set for students.",
      },
      default: undefined,
    },
  },
  { timestamps: true }
);
userSchema.index({ role: 1, email: 1 });

userSchema.pre("save", function (next) {
  if (this.role !== "Student") {
    this.level = undefined;
  }
  next();
});
userSchema.pre("save", async function (next) {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});
module.exports = mongoose.model("User", userSchema);
