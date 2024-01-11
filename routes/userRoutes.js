const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updatePassword,
  updateUser,
  updateUserProfilePhoto,
} = require("../controllers/userControllers");

const {
  authenticationMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware");

const { Router } = require("express");
const router = Router();

router.get("/get-users", getAllUsers);
router.get("/get-user", getUser);
router.get("/get-currentuser", getCurrentUser);
router.post("/update-password", authenticationMiddleware, updatePassword);
router.post("/update-user", authenticationMiddleware, updateUser);

module.exports = router;
