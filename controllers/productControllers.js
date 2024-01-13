const Product = require("../models/Product");
const Review = require("../models/Review");
const { StatusCodes } = require("http-status-codes");
const ImageKit = require("imagekit");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");

const imagekit = new ImageKit({
  publicKey: process.env.IMAGE_KIT_PUBLIC_KEY,
  privateKey: process.env.IMAGE_KIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGE_KIT_URL,
});

const createProduct = async (req, res) => {
  const { id: userId } = req.user;
  // const { name, price, description, productImages, category, company } = req.params;
  const product = await Product.create({ ...req.body, user: userId });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Product created successfully.", product });
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res
    .status(StatusCodes.OK)
    .json({ message: "Success", products, count: products.length });
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findOne({ _id: id }).populate("reviews");
  if (!product) throw new Error(`Product with id ${id} not found`);
  res.status(StatusCodes.OK).json({ message: "Success", product });
};

const updateProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOneAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });
  if (!product)
    throw new NotFoundError(`Product with id ${productId} not found.`);
  res.status(StatusCodes.OK).json({ message: "Success", product });
};

const deleteProduct = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({ _id: productId });
  if (!product)
    throw new NotFoundError(`Product with id ${productId} not found.`);
  // const reviewCount = await Review.countDocuments({ product: productId });
  await product.deleteOne();
  // Deleting all reviews associated with the deleted product.
  await Review.deleteMany({ product: productId });
  res.status(StatusCodes.OK).json({ message: "Successfully deleted product." });
};

const uploadProductImages = async (req, res) => {};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
};
