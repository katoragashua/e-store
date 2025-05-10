const {
  createOrder,
  getSingleOrder,
  getCurrentUserOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderControllers");

const {
  authenticationMiddleware,
  authorizePermissions,
} = require("../middlewares/authenticationMiddleware");

const { Router } = require("express");
const router = Router();

router.post("/", authenticationMiddleware, createOrder);
router.get(
  "/",
  authenticationMiddleware,
  authorizePermissions("admin"),
  getAllOrders
);
router.get("/get-user-orders", authenticationMiddleware, getCurrentUserOrders);
router.patch("/:id", authenticationMiddleware, updateOrder);
router.get("/:id", authenticationMiddleware, getSingleOrder);
router.delete("/:id", authenticationMiddleware, deleteOrder);

module.exports = router;
