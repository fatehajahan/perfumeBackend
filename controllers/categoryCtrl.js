const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");

async function categoryCtrl(req, res) {
    try {
        const { categoryName, categoryDescription } = req.body;

        if (!categoryName || !categoryDescription) {
            return res.status(400).json({ error: "All fields are required", status: "failed" });
        }

        const existingCategory = await categorySchema.findOne({ categoryName });
        if (existingCategory) {
            return res.status(400).json({ error: "This Category already exists", status: "failed" });
        }

        const category = new categorySchema({ categoryName, categoryDescription });
        await category.save();

        res.status(201).json({
            message: "Category created successfully",
            status: "success",
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getAllCategoryCtrl(req, res) {
    try {
        const allCategories = await categorySchema.find({}).populate("subCategory").populate("product")
        if (!allCategories.length) {
            return res.status(404).json({ error: "No categories found", status: "failed" });
        }
        res.status(200).json({
            message: "Fetched all categories",
            status: "success",
            data: allCategories
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getSingleCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const category = await categorySchema.findById(id).populate("subCategory");
        if (!category) {
            return res.status(404).json({ error: "Category not found", status: "failed" });
        }
        res.status(200).json({
            message: "Fetched single category",
            status: "success",
            data: category
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function updateSingleCategoryCtrl(req, res) {
    const { id } = req.params
    const { categoryName, categoryDescription } = req.body

    const updateCategory = await categorySchema.findByIdAndUpdate(
        id,
        {
            categoryName: categoryName,
            categoryDescription: categoryDescription
        },
        { new: true }
    )

    res.status(200).json({
        message: "category updated successfully",
        updateCategory
    })
     
    //try {
    //     const { id } = req.params;
    //     const { categoryName, categoryDescription } = req.body;

    //     const updatedCategory = await categorySchema.findByIdAndUpdate(
    //         id,
    //         { categoryName, categoryDescription },
    //         { new: true }
    //     );

    //     if (!updatedCategory) {
    //         return res.status(404).json({ error: "Category not found", status: "failed" });
    //     }

    //     res.status(200).json({
    //         message: "Category updated successfully",
    //         status: "success",
    //         data: updatedCategory
    //     });
    // } catch (error) {
    //     console.error(error);
    //     res.status(500).json({ error: "Internal server error", status: "failed" });
    // }
}

async function deleteCategoryCtrl(req, res) {
    try {
        const { id } = req.params;
        const deletedCategory = await categorySchema.findByIdAndDelete(id);

        if (!deletedCategory) {
            return res.status(404).json({ error: "Category not found", status: "failed" });
        }

        res.status(200).json({
            message: "Category deleted successfully",
            status: "success",
            data: deletedCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

module.exports = {
    categoryCtrl,
    getAllCategoryCtrl,
    getSingleCategoryCtrl,
    updateSingleCategoryCtrl,
    deleteCategoryCtrl
};
