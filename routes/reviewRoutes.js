const {
  createReview,
  getAllProductReviews,
  getAllReviews,
  getSingleReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewControllers");
const { Router } = require("express");
const router = Router();
const {
  authenticationMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware");

router.post("/create-review", authenticationMiddleware, createReview);
router.get("/get-reviews", getAllReviews);
router.get("/get-reviews/:id", getAllProductReviews);
router.get("/get-review/:id", getSingleReview);
router.post("/update-review/:id", authenticationMiddleware, updateReview);
router.delete("/delete-review/:id", authenticationMiddleware, deleteReview);

module.exports = router;
