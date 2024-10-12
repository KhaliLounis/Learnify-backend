require("dotenv").config();
require("express-async-errors");
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");

const connectDB = require("./db/connect");
const notFound = require("./middleware/not-found");
const errorHandler = require("./middleware/error-handler");
const router = require("./routes");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ useTempFiles: true }));

app.use("/api", router);

app.use(errorHandler);
app.use(notFound);

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
