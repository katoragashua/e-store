// Dependencies
const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./utils/connectDB");
const morgan = require("morgan");
require("express-async-errors");

const app = express();
config();

// Routers
const authRouter = require("./routes/authRoutes");

// Middlewares
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

app.use(morgan("tiny"));
app.use(express.json())

app.get("/", (req, res) => {
  res.send(`<h1>E-Store</h1>`);
});

app.use("/api/v1/auth", authRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Start function
const start = async () => {
  try {
    // await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server listening of port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
