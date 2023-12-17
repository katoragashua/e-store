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
router.post("/verify-email", verifyEmail);

module.exports = router;
