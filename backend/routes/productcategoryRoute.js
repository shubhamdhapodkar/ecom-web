const express = require("express");
const { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory } = require("../controller/productcategoryCtrl");
const { authMiddlware, isAdmin } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post('/', authMiddlware, isAdmin, createCategory);
router.get('/all', getAllCategory);
router.put('/:id', authMiddlware, isAdmin, updateCategory);
router.delete('/:id', authMiddlware, isAdmin, deleteCategory);
router.get('/:id', getCategory);






module.exports = router;