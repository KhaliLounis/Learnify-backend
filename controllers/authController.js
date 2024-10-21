const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const uploadImage = require("../utils/upload");

const register = async (req, res) => {
  const { name, email, password, role, level } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  const newUser = {
    name,
    email,
    password,
    role,
  };

  if (role === "Student" && level) {
    newUser.level = level;
  }

  if (req.files && req.files.image) {
    try {
      const imageUrl = await uploadImage(req.files.image, "user-profile-pics");
      newUser.imageUrl = imageUrl;
    } catch (error) {
      return res.status(500).json({ message: "Image upload failed" });
    }
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

  return res
    .status(201)
    .json({ user: { id: user._id, name: user.name, image: newUser.imageUrl } });
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
