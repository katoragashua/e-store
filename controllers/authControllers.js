const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const crypto = require("node:crypto");
const User = require("../models/User");
const Token = require("../models/Token");
const bcrypt = require("bcryptjs");
const utils = require("../utils/index");
const {
  NotFoundError,
  BadRequestError,
  UnauthenticatedError,
  UnauthorizedError,
  UnsupportedMediaError,
} = require("../errors/index");

const comparePasswords = async (password, userPassword) => {
  const correctPassword = await bcrypt.compare(password, userPassword);
  if (!correctPassword)
    throw new UnauthenticatedError(
      "Password is incorrect. Enter correct password."
    );
  return correctPassword;
};

const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    throw new BadRequestError("Please enter a username, email, or password");

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new BadRequestError("User already exists.");
  }

  // Check if it's first user and make him admin
  const admin = (await User.countDocuments()) === 0;
  const role = admin ? "admin" : "user";
  const verificationToken = crypto.randomBytes(40).toString("hex");

  // Create user
  const user = await User.create({
    username,
    email,
    password,
    role,
    verificationToken,
  });

  const origin = "http://localhost:5000";
  await utils.sendVerificationEmail({
    username: user.username,
    email: user.email,
    verificationToken: user.verificationToken,
    origin: origin,
  });


  res.status(StatusCodes.CREATED).json({
    user,
    message:
      "Please verify your account. A verification email has been sent to your email address.",
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(password);
  if (!email || !password)
    throw new BadRequestError("Please enter email or username, and password.");
  // Users can login with their username or email
  const user =
    (await User.findOne({ email })) ||
    (await User.findOne({ username: email }));
  if (!user) throw new NotFoundError("User not found. Proceed to signup");
  await comparePasswords(password, user.password);

  const userObj = utils.userObj(user);
  console.log(userObj);

  let refreshToken = "";
  const existingToken = await Token.findOne({ user: user._id });
  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid)
      throw new UnauthorizedError(
        "Not authorized. Please reach out to the admin. You have been blocked from this service."
      );
    refreshToken = existingToken.refreshToken;
    await utils.attachCookies(res, userObj, refreshToken);
    return res.status(StatusCodes.OK).json({
      user,
      token: existingToken,
      msg: "User logged in successfully.",
    });
  }

  refreshToken = crypto.randomBytes(40).toString("hex");
  // Below is an object model for the TokenSchema. Note: isValid is default true.
  const tokenObject = { refreshToken, user: user._id };
  const token = await Token.create({ ...tokenObject });
  await utils.attachCookies(res, userObj, refreshToken);
  res
    .status(StatusCodes.OK)
    .json({ user, token, msg: "User logged in successfully." });
};

const signOut = async (req, res) => {};

const verifyEmail = async (req, res) => {
  const { email, token } = req.body;
  if (!email || !token)
    throw new BadRequestError("No or invalid email and or token");
  const user = await User.findOne({ email });
  if (!user) throw new NotFoundError("User not found.");

  if (user.verificationToken !== token)
    throw new UnauthenticatedError("Verification failed.");
  user.isVerified = true;
  user.verificationToken = "";
  user.verified = new Date(Date.now());
  await user.save();
  res.status(StatusCodes.OK).json({success: true, msg: "Verification successful.", user})
};

const forgotPassword = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
};
