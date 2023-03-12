const express = require("express");
const { createBrand, updateBrand, deleteBrand, getBrand, getAllBrand } = require("../controller/brandCtrl");
const { authMiddlware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post('/', authMiddlware, isAdmin, createBrand);
router.get('/all', getAllBrand);
router.put('/:id', authMiddlware, isAdmin, updateBrand);
router.delete('/:id', authMiddlware, isAdmin, deleteBrand);
router.get('/:id', getBrand);






module.exports = router;