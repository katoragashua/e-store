const { StatusCodes } = require("http-status-codes");
const User = require("../models/User");
const Token = require("../models/Token");
const utils = require("../utils/index");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");

const getAllUsers = async (req, res) => {
  const users = await User.find({});
  res.status(StatusCodes.OK).json({ users });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError("User not found.");
  return res.status(StatusCodes.OK).json({ user });
};

const getCurrentUser = async (req, res) => {
  const { id } = req.user;
  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError("User not found.");
  res.status(StatusCodes.OK).json({ user });
};

const updatePassword = async (req, res) => {
  const { id } = req.user;
  const { password, newPassword } = req.body;
  if (!password || !newPassword)
    throw new BadRequestError("Please enter current and new password.");
  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError("User not found.");
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Password updated successfully", user });
};

const updateUserProfilePhoto = async (req, res) => {
    res.status(StatusCodes.OK).json({msg: "Profile photo updated successfully"})
}

const updateUser = async(req,res) => {
    const {id} = req.user
    const {username, password} = req.body
}

module.exports = { getAllUsers, getUser, getCurrentUser, updatePassword };
