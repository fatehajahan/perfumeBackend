const categorySchema = require("../models/categorySchema");
const subCategorySchema = require("../models/subCategorySchema");

async function subCategoryCtrl(req, res) {
    try {
        const { subCategoryName, subCategoryDescription, category } = req.body;

        const foundCategory = await categorySchema.findById(category);
        if (!foundCategory) {
            return res.status(400).json({ error: "This category does not exist", status: "failed" });
        }

        const subCategory = new subCategorySchema({
            subCategoryName,
            subCategoryDescription,
            category: foundCategory._id
        });
        await subCategory.save();

        // Update category
        await categorySchema.findByIdAndUpdate(
            foundCategory._id,
            { $push: { subCategory: subCategory._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Subcategory created successfully",
            status: "success",
            data: subCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getAllSubCategoryCtrl(req, res) {
    try {
        const allSubCategories = await subCategorySchema.find({});
        res.status(200).json({
            message: "Fetched all subcategories",
            status: "success",
            data: allSubCategories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getSingleSubCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const subCategory = await subCategorySchema.findById(id);
        if (!subCategory) {
            return res.status(404).json({ error: "SubCategory not found", status: "failed" });
        }
        res.status(200).json({
            message: "Fetched single subcategory",
            status: "success",
            data: subCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function updateSingleSubCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const { subCategoryName, subCategoryDescription } = req.body;

        const updatedSubCategory = await subCategorySchema.findByIdAndUpdate(
            id,
            { subCategoryName, subCategoryDescription },
            { new: true }
        );

        if (!updatedSubCategory) {
            return res.status(404).json({ error: "SubCategory not found", status: "failed" });
        }

        res.status(200).json({
            message: "Subcategory updated successfully",
            status: "success",
            data: updatedSubCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function deleteSubCategoryCtrl(req, res) {
    try {
        const { id } = req.params;

        const deletedSubCategory = await subCategorySchema.findByIdAndDelete(id);
        if (!deletedSubCategory) {
            return res.status(404).json({ error: "SubCategory not found", status: "failed" });
        }

        // Remove subcategory from category
        await categorySchema.findByIdAndUpdate(
            deletedSubCategory.category,
            { $pull: { subCategory: deletedSubCategory._id } }
        );

        res.status(200).json({
            message: "SubCategory deleted successfully",
            status: "success",
            data: deletedSubCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

module.exports = {
    subCategoryCtrl,
    getAllSubCategoryCtrl,
    getSingleSubCategoryCtrl,
    updateSingleSubCategoryCtrl,
    deleteSubCategoryCtrl
};
