const mongoose = require("mongoose");

// function to connect to the database

const connectDB = async (url) => {
  return mongoose.connect(url);
};

module.exports = connectDB