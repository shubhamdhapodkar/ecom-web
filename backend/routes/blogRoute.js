const express = require("express");
const { createBlog, updateBlog, getBlog, getAllblog, deleteBlog, LikeBlog, likeBlog, dislikeBlog } = require("../controller/blogCtrl");
const { uploadImages } = require("../controller/blogCtrl");
const { isAdmin, authMiddlware } = require('../middlewares/authmiddleware');
const { uploadPhoto, blogImgResize } = require("../middlewares/uploadImages");

const router = express.Router();
router.put("/upload/:id", authMiddlware, isAdmin, uploadPhoto.array('images', 2), blogImgResize, uploadImages);
router.post("/", authMiddlware, isAdmin, createBlog);
router.put("/likes", authMiddlware, likeBlog);
router.put("/dislikes", authMiddlware, dislikeBlog);
router.put("/:id", authMiddlware, isAdmin, updateBlog);
router.get("/:id", getBlog);
router.get("/", getAllblog);
router.delete("/:id", authMiddlware, isAdmin, deleteBlog);









module.exports = router;