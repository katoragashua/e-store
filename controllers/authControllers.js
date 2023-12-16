const jwt = require("jsonwebtoken");
const { StatusCodes } = require("http-status-codes");
const crypto = require("node:crypto");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
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
    throw new UnauthenticatedError("Password is incorrect. Enter correct password.");
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

  // const origin = "http://localhost:5000";
  // await utilFuncs.sendVerificationEmail({
  //   firstname: user.firstname,
  //   email: user.email,
  //   verificationToken: user.verificationToken,
  //   origin: origin,
  // });

  // await User.deleteMany()

  res.status(StatusCodes.CREATED).json({
    user,
    message:
      "Please verify your account. A verification email has been sent to your email address.",
  });
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  console.log(password)
  if (!email || !password)
    throw new BadRequestError("Please enter email or username, and password.");
  const user =
    (await User.findOne({ email })) ||
    (await User.findOne({ username: email }));
  if (!user) throw new NotFoundError("User not found. Proceed to signup");
  await comparePasswords(password, user.password);
  console.log(user);
  res
    .status(StatusCodes.OK)
    .json({ user, msg: "User logged in successfully." });
};

const signOut = async (req, res) => {};

const verifyEmail = async (req, res) => {};

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
