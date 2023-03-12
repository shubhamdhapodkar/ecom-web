const express = require("express");
const { createCoupon, getallCoupon, updateCoupons, deleteCoupons } = require("../controller/couponCtrl");
const { authMiddlware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/", authMiddlware, isAdmin, createCoupon);
router.get("/", authMiddlware, isAdmin, getallCoupon);
router.put("/:id", authMiddlware, isAdmin, updateCoupons);
router.delete("/:id", authMiddlware, isAdmin, deleteCoupons);




module.exports = router;