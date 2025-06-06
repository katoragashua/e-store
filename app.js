// Dependencies
const express = require("express");
const { config } = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./utils/connectDB");
const morgan = require("morgan");
require("express-async-errors");
const Token = require("./models/Token");
const User = require("./models/User");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const multer = require("multer");
const upload = multer({ dest: "uploads/" });
const fs = require("node:fs/promises");

const app = express();
config();

// Routers
const authRouter = require("./routes/authRoutes");
const productRouter = require("./routes/productRoutes");
const {
  uploadPhotos,
  uploadProfilePhoto,
} = require("./controllers/photosController");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");
const orderRouter = require("./routes/orderRoutes");

// Middlewares
const notFound = require("./middlewares/notFound");
const errorHandlerMiddleware = require("./middlewares/errorHandlerMiddleware");

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));
// app.use(fileUpload());

app.get("/", (req, res) => {
  res.send(`<h1>E-Store</h1>`);
});

app.get("/api/v1/download", async (req, res) => {
  // const file = await fs.open("./public/downloads", "w")
  // const write = await fs.createWriteStream("./public/downloads")
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/upload-photos", upload.array("photos", 10), uploadPhotos);
app.use(
  "/api/v1/upload-profile-photo",
  upload.single("photo"),
  uploadProfilePhoto
);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/reviews", reviewRouter);
app.use("/api/v1/orders/", orderRouter);

app.use(notFound);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

// Start function
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // await Token.deleteMany();
    // await User.deleteMany();
    app.listen(port, () => {
      console.log(`Server listening of port ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
