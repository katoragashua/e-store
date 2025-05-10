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
  // We do not need to check if the user exists already since we already have in the authentication middleware
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) throw new UnauthenticatedError("Invalid credentials");
  user.password = newPassword;
  await user.save();
  res
    .status(StatusCodes.OK)
    .json({ msg: "Password updated successfully", user });
};

const updateUserProfilePhoto = async (req, res) => {
  res
    .status(StatusCodes.OK)
    .json({ msg: "Profile photo updated successfully" });
};

// const updateUser = async (req, res) => {
//   const { id } = req.user;
//   const { email, username } = req.body;
//   if (!email || !username)
//     throw new BadRequestError("Please enter email and username.");

//   const user = await User.findOneAndUpdate(
//     { _id: id },
//     { email, username },
//     { new: true, runValidators: true }
//   );
//   if (!user) throw new NotFoundError("User not found.");
//   const token = await Token.find({ user: id });

//   const updatedUserObj = utils.userObj(user);
//   await utils.attachCookies(res, updatedUserObj, token.refreshToken);

//   res.status(StatusCodes.OK).json({ msg: "Updated user successfully", user });
// };

const updateUser = async (req, res) => {
  const { id } = req.user;
  const { email, username } = req.body;
  if (!email || !username)
    throw new BadRequestError("Please enter email and username.");

  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError("User not found.");

  user.email = email;
  user.username = username;
  await user.save();
  const token = await Token.findOne({ user: id });

  const updatedUserObj = utils.userObj(user);
  await utils.attachCookies(res, updatedUserObj, token.refreshToken);

  res.status(StatusCodes.OK).json({ msg: "Updated user successfully", user });
};

module.exports = {
  getAllUsers,
  getUser,
  getCurrentUser,
  updatePassword,
  updateUser,
  updateUserProfilePhoto,
};
