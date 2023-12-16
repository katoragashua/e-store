const jwt = require("jsonwebtoken");

// This returns a token
const createJWT = async (payload) => {
  return await jwt.sign(payload, process.env.JWT_SECRET);
};

// This verifies the token
const verifyJWT = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
  createJWT,
  verifyJWT,
};
