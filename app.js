require("dotenv").config();
require("express-async-errors");
const express = require("express");
const { connectDB } = require("./db/connect");
const app = express();
const router = require("./routes");

const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api", router);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`listening from port ${PORT} ...`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
