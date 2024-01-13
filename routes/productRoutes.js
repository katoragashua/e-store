const {
  createProduct,
  getAllProducts,
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

router.post("/create-product", authenticationMiddleware, createProduct);

router.get("/get-products", getAllProducts);

router.get("/get-product/:id", getProduct);

router.delete("/delete-product/:id", deleteProduct);

router.patch("/update-product/:id", updateProduct);

module.exports = router;
