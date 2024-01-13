const Review = require("../models/Review");
const Product = require("../models/Product");
const { StatusCodes } = require("http-status-codes");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");
const utils = require("../utils/index");

const createReview = async (req, res) => {
  const { product: productId } = req.body;
  const { id: user } = req.user;
  const product = await Product.findOne({ _id: productId });
  if (!product)
    throw new NotFoundError(`Product with id: ${productId} does not exist.`);
  const alreadyReviewedByUser = await Review.findOne({
    user: user,
    product: productId,
  });

  if (alreadyReviewedByUser)
    throw new BadRequestError("Product already reviewed by user.");

  const review = await Review.create({ ...req.body, user });
  res
    .status(StatusCodes.CREATED)
    .json({ msg: "Successfully reviewed the product", review });
};

const getAllReviews = async (req, res) => {
  const reviews = await Review.find({});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getAllProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const product = await Product.findOne({_id:productId});
  if(!product) throw new NotFoundError(`Product with id: ${productId} not found.`)
  const reviews = await Review.find({ product: productId }).populate({path:"user", select:"username email"}).populate({path: "product", select: "name company price"});
  res.status(StatusCodes.OK).json({ reviews, count: reviews.length });
};

const getSingleReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId })
  if (!review) throw new NotFoundError("Review not found");
  res.status(StatusCodes.OK).json({ msg: "Success", review });
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const { rating, title, comment } = req.body;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new NotFoundError("Review not found");
  utils.checkPermissions(req.user, review.user);
  review.rating = rating;
  review.title = title;
  review.comment = comment;
  await review.save();
  res.status(StatusCodes.OK).json({ msg: "Success", review });
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findOne({ _id: reviewId });
  if (!review) throw new NotFoundError("Review not found");
  await review.deleteOne();
  res.status(StatusCodes.OK).json({ msg: "Successfully delete the review" });
};

module.exports = {
  createReview,
  getAllReviews,
  getAllProductReviews,
  getSingleReview,
  updateReview,
  deleteReview,
};
