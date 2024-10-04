const User = require("../models/User");

const register = (req, res) => {
  res.status(200).json({ message: "welcome here" });
};
const login = (req, res) => {
  res.status(200).json({ message: "welcome here" });
};

module.exports = {
  register,
  login,
};
