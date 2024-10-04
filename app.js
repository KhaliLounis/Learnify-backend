require("dotenv").config();
const express = require("express");
require("express-async-errors");
const app = express();
const router = express.Router();

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("welcome to learnify");
});
app.listen(PORT, () => {
  console.log(`listening from port ${PORT} ...`);
});
