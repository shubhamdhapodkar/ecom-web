const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbid");
const asyncHandler = require("express-async-handler");
//create
const createCoupon = asyncHandler(async (req, res) => {
    try {
        const newCoupon = await Coupon.create(req.body);
        res.json(newCoupon);
    } catch (error) {
        throw new Error(error);
    }
});
//get
const getallCoupon = asyncHandler(async (req, res) => {
    try {
        const coupons = await Coupon.find();
        res.json(coupons);
    } catch (error) {
        throw new Error(error);
    }
})

//update
const updateCoupons = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedcoupons = await Coupon.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updatedcoupons);
    } catch (error) {
        throw new Error(error);
    }
});
//delete
const deleteCoupons = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedcoupons = await Coupon.findByIdAndDelete(id);
        res.json(deletedcoupons);
    } catch (error) {
        throw new Error(error);
    }
});


module.exports = { createCoupon, getallCoupon, updateCoupons, deleteCoupons };