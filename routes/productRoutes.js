const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadProductImages,
} = require("../controllers/productControllers");
const {
  authenticationMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware");

const { Router } = require("express");
const router = Router();

router.post(
  "/create-product",
  authenticationMiddleware,
  createProduct
);

module.exports = router;
