const router = require("express").Router();

const {
  getProgress,
  createProgress,
  updateProgress,
  deleteProgress,
} = require("../controllers/progressController");
