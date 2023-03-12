const express = require("express");
const {
  createUser,
  LoginUserCtrl,
  getallUser,
  getauser,
  deleteauser,
  updatedUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  LoginAdmin,
  getWishList,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  getAllOrders,
  updateOrderStatus
} = require("../controller/userCrtl");
const { authMiddlware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/register", createUser);
router.post("/cart", authMiddlware, userCart);
router.post("/forgot-password-token", forgotPasswordToken);
router.put("/reset-password/:token", resetPassword);
router.put("/order/update-order/:id", authMiddlware,isAdmin,updateOrderStatus);
router.put('/password', authMiddlware, updatePassword);
router.post("/login", LoginUserCtrl);
router.post("/admin-login", LoginAdmin);
router.post("/cart/applycoupon", authMiddlware, applyCoupon);
router.post("/cart/cash-order",authMiddlware,createOrder);
router.get("/all-users", getallUser);
router.get("/get-orders",authMiddlware, getOrders);
router.get("/get-Allorders",authMiddlware, getAllOrders);
router.get("/cart", authMiddlware, getUserCart);
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/wishlist", authMiddlware, getWishList);
router.get("/:id", authMiddlware, isAdmin, getauser);
router.delete("/empty-cart", authMiddlware, emptyCart);
router.delete("/:id", deleteauser);
router.put("/edit-user", authMiddlware, updatedUser);
router.put("/save-address", authMiddlware, saveAddress);
router.put("/block-user/:id", authMiddlware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddlware, isAdmin, unblockUser);

module.exports = router;
