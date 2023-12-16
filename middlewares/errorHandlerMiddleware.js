const express = require("express");
const { StatusCodes } = require("http-status-codes");

const errorHandlerMiddleware = (error, req, res, next) => {
  res.json({ code: error.statusCode, msg: error.message });
};

module.exports = errorHandlerMiddleware;
