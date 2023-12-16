const { Router } = require("express");
const router = Router();
const {
  signUp,
  signIn,
  signOut,
  verifyEmail,
  forgotPassword,
  resetPassword,
} = require("../controllers/authControllers");

router.post("/signup", signUp);
router.post("/login", signIn);

module.exports = router;
