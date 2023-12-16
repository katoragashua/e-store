const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL,
});

const createProduct = async (req, res) => {
  const { name, price, description, images, category, company } = req.params;
};

const getProducts = async (req, res) => {};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id });
  if (!product) throw new Error(`Product with id ${id} not found`);
  res.status(StatusCodes.OK).json({ message: "Success", product });
};

const updateProduct = async (req, res) => {};

const deleteProduct = async (req, res) => {};

const uploadProductImages = async (req, res) => {};

module.exports = {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
};
