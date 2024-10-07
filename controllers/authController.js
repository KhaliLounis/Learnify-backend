const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  const { name, email, password, role, level } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const newUser = {
    name,
    email,
    password: hashedPassword,
    role,
  };
  if (role === "Student" && level) {
    newUser.level = level;
  }
  const user = await User.create(newUser);
  const token = jwt.sign(
    { userId: user._id, name, role, level },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(201).json({ user: { id: user._id, name: user.name } });
};
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(404).json({ message: "User doesn't exist" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  const token = jwt.sign(
    { userId: user._id, name: user.name, role: user.role, level: user.level },
    process.env.JWT_SECRET_KEY,
    { expiresIn: "24h" }
  );
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ user: { id: user._id, name: user.name } });
};

module.exports = {
  register,
  login,
};
