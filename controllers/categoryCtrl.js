const { get } = require("mongoose")
const categorySchema = require("../models/categorySchema")
const productSchema = require("../models/productSchema")

async function categoryCtrl(req, res) {
    const { categoryName, categoryDescription } = req.body
    const exsistingCategory = await categorySchema.findOne({ categoryName })
    if (!categoryName || !categoryDescription) {
        return res.status(400).json({ error: "All fields are required", statues: "failed" })
    }
    if (exsistingCategory) {
        return res.status(400).json({ error: "This Category already exists", statues: "failed" })
    }

    const category = new categorySchema({
        categoryName,
        categoryDescription
    })
    category.save()
    res.status(200).json({
        message: "Category created successfully", statues: "success",
        data: category
    })
}

async function getAllCategoryCtrl(req, res) {
    try {
        const allCategory = await categorySchema.find({}).populate("subCategory").populate("product")
        if (!allCategory || allCategory.length === 0) {
            return res.status(404).json({ error: "No categories found", statues: "failed" })
        }
        res.status(200).json({
            message: "get all category",
            statues: "success",
            data: allCategory
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}

async function getSingleCategoryCtrl(req, res) {
    const { id } = req.params //we need to use params when we need id. 
    const getSingleCategory = await categorySchema.findOne({ _id: id })

    res.status(200).json({
        message: "get single category",
        statues: "success",
        data: getSingleCategory
    })
}

async function updateSingleCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const { categoryName, categoryDescription } = req.body;

        const updateData = {};
        if (categoryName) updateData.categoryName = categoryName;
        if (categoryDescription) updateData.categoryDescription = categoryDescription;

        const updatedCategory = await categorySchema.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!updatedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({ message: "Category updated successfully", data: updatedCategory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function deleteCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const deletedCategory = await categorySchema.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        res.status(200).json({
            message: "Category deleted successfully",
            data: deletedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
}


module.exports = { categoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateSingleCategoryCtrl, deleteCategoryCtrl }