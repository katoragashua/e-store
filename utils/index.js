const { createJWT, verifyJWT } = require("./jwt");
const attachCookies = require("./cookies");
const { User, userObj } = require("./createUserObj");
const sendVerificationEmail = require("./sendVerificationEmail");
const sendResetEmail = require("./sendResetEmail");
const checkPermissions = require("./checkPermissions");
const hash = require("./hash");

module.exports = {
  createJWT,
  verifyJWT,
  attachCookies,
  User,
  userObj,
  sendVerificationEmail,
  sendResetEmail,
  checkPermissions,
  hash,
};
