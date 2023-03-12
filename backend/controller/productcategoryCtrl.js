const Pcategory = require("../models/productcategoryModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbid");

//create
const createCategory = asyncHandler(async (req, res) => {
    try {
        const newCategory = await Pcategory.create(req.body);
        res.json(newCategory);
    } catch (error) {
        throw new Error(error);
    }
});

//update
const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const updatedCategory = await Pcategory.findByIdAndUpdate(id, req.body, {
            new: true,
        })
        res.json(updatedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

//delete
const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const deletedCategory = await Pcategory.findByIdAndDelete(id)
        res.json(deletedCategory);
    } catch (error) {
        throw new Error(error);
    }
});

//get 
const getCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    validateMongoDbId(id);
    try {
        const getaCategory = await Pcategory.findById(id);
        res.json(getaCategory);
    } catch (error) {
        throw new Error(error);
    }
});
//get all
const getAllCategory = asyncHandler(async (req, res) => {
    try {
        const getallCategory = await Pcategory.find();
        res.json(getallCategory);
    } catch (error) {
        throw new Error(error);
    }
});

module.exports = { createCategory, updateCategory, deleteCategory, getCategory, getAllCategory };