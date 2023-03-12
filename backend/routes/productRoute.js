const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishList, rating, uploadImages } = require("../controller/productCtrl");
const { isAdmin, authMiddlware } = require('../middlewares/authmiddleware');
const { uploadPhoto, productImgResize } = require("../middlewares/uploadImages");
const router = express.Router();

router.put("/upload/:id", authMiddlware, isAdmin, uploadPhoto.array('images', 10), productImgResize,uploadImages);
router.post('/', authMiddlware, isAdmin, createProduct);
router.get('/:id', getaProduct);
router.put('/wishlist', authMiddlware, addToWishList);
router.put('/rating', authMiddlware, rating);
router.put('/:id', authMiddlware, isAdmin, updateProduct);
router.delete('/:id', authMiddlware, isAdmin, deleteProduct);
router.get('/', getAllProduct);






module.exports = router;
