const Product = require("../models/Product");
const Order = require("../models/Order");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");
const utils = require("../utils/index")

const createOrder = async (req, res) => {
  res.status(StatusCodes.CREATED).json({msg: "Order created successfully"})

};

const getSingleOrder = async (req, res) => {};

const getCurrentUserOrders = async (req, res) => {};

const getAllOrders = async (req, res) => {};

const updateOrder = async (req, res) => {};

const deleteOrder = async (req, res) => {};

module.exports = {
  createOrder,
  getSingleOrder,
  getCurrentUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
};
