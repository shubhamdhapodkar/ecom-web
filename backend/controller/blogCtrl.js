const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");
const cloudinaryUploadImg = require("../utils/cloudiniary")
const fs = require("fs");

//create
const createBlog = asyncHandler(async (req, res) => {
    try {
        const newBlog = await Blog.create(req.body);
        res.json({
            status: "success",
            newBlog
        });
    } catch (error) {
        throw new Error(error)
    }
});

//update
const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const updateBlog = await Blog.findByIdAndUpdate(id, req.body, {
            new: true,
        });
        res.json(updateBlog);
    } catch (error) {
        throw new Error(error)
    }
});
//get a single blog
const getBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id)
    try {
        const getBlog = await Blog.findById(id)
            .populate('Likes')
            .populate('disLikes');
        await Blog.findByIdAndUpdate(id, {
            $inc: { numViews: 1 },
        },
            {
                new: true,
            });
        res.json(getBlog);
    } catch (error) {
        throw new Error(error)
    }
});
//get all blog
const getAllblog = asyncHandler(async (req, res) => {
    try {
        const getBlogs = await Blog.find();
        res.json(getBlogs);
    } catch (error) {
        throw new Error(error)
    }
})
//delete blog
const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.json(deleteBlog);
    } catch (error) {
        throw new Error(error)
    }
});

//likes

const likeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    //find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    //find the login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the post
    const isLiked = blog?.isLiked;
    //find if the user diskliked the blog post
    const alreadyDisliked = blog?.disLikes?.find(
        (userId) => userId?.toString() === loginUserId?.toString());
    if (alreadyDisliked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisLiked: false,
        },
            {
                new: true,
            });
        res.json(blog);
    }
    if (isLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { Likes: loginUserId },
            isLiked: false,
        },
            {
                new: true,
            });
        res.json(blog);
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { Likes: loginUserId },
            isLiked: true,
        },
            {
                new: true,
            });
        res.json(blog);
    }
})

//dislikes
const dislikeBlog = asyncHandler(async (req, res) => {
    const { blogId } = req.body;
    validateMongoDbId(blogId);
    //find the blog which you want to be liked
    const blog = await Blog.findById(blogId);
    //find the login user
    const loginUserId = req?.user?._id;
    //find if the user has liked the post
    const isDisLiked = blog?.isDisLiked;
    //find if the user diskliked the blog post
    const alreadyLiked = blog?.Likes?.find(
        (userId) => userId?.toString() === loginUserId?.toString());
    if (alreadyLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { Likes: loginUserId },
            isLiked: false,
        },
            {
                new: true,
            });
        res.json(blog);
    }
    if (isDisLiked) {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $pull: { disLikes: loginUserId },
            isDisLiked: false,
        },
            {
                new: true,
            });
        res.json(blog);
    }
    else {
        const blog = await Blog.findByIdAndUpdate(blogId, {
            $push: { disLikes: loginUserId },
            isDisLiked: true,
        },
            {
                new: true,
            });
        res.json(blog);
    }
});

//upload images
const uploadImages = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const uploader = (path) => cloudinaryUploadImg(path, "images");
        const urls = [];
        const files = req.files;
        for (const file of files) {
            const { path } = file;
            const newpath = await uploader(path);
            urls.push(newpath);
            fs.unlinkSync(path);
        }
        const findblog = await Blog.findByIdAndUpdate(id, {
            images: urls.map((file) => {
                return file;
            }),
        }, {
            new: true,
        });
        res.json(findblog);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createBlog, updateBlog, getBlog, getAllblog, deleteBlog, likeBlog, dislikeBlog, uploadImages };
