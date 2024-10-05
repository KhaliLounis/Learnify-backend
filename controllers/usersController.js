const User = require("../models/User");
const bcrypt = require("bcryptjs");
const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById(id).select("-password");
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json(user);
};
const getAllUsers = async (req, res) => {
  const users = await User.find().select("-password");
  if (!users) {
    return res.status(404).json({ message: "No user was found" });
  }
  res.status(200).json(users);
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findByIdAndDelete(id);
  res.status(200).json({ message: "User deleted successfully" });
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, password } = req.body;
  const userData = {
    name,
    role,
  };

  const existingUser = await User.findById(id);
  if (!existingUser) {
    return res.status(404).json({ message: "User not found" });
  }

  if (email && email !== existingUser.email) {
    const duplicateUser = await User.findOne({ email });
    if (duplicateUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    userData.email = email;
  }
  if (password) {
    const salt = await bcrypt.genSalt(10);
    userData.password = await bcrypt.hash(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, userData, {
    new: true,
    runValidators: true,
  }).select("-password");
  res.status(200).json({ user: updatedUser });
};
module.exports = {
  getUser,
  getAllUsers,
  deleteUser,
  updateUser,
};
