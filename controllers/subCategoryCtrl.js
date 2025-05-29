const categorySchema = require("../models/categorySchema")
const subCategorySchema = require("../models/subCategorySchema")

async function subCategoryCtrl(req, res) {
    const { subCategoryName, subCategoryDescription, category } = req.body
    const foundCategory = await categorySchema.findOne({ categoryName: category })  

    if (!foundCategory) {
        return res.status(400).json({ error: "This category does not exist", statues: "failed" })
    }
    const subCategory = new subCategorySchema({
        subCategoryName,
        subCategoryDescription,
        category: foundCategory.categoryName
    })
    subCategory.save();

    await categorySchema.findOneAndUpdate(
        { categoryName: category },
        {
            $push: { subCategory: subCategory.subCategoryName }
        },
        { new: true }
    )

    res.status(200).json({
        message: "Subcategory created successfully done",
        statues: "success",
        data: subCategory
    })
}

async function getAllSubCategoryCtrl(req, res) {
    try {
        const allSubCategory = await subCategorySchema.find({})
        res.status(200).json({
            message: "get all SubCategory",
            statues: "success",
            data: allSubCategory
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}

async function getSingleSubCategoryCtrl(req, res) {
    // console.log(req.params)
    const { id } = req.params
    const getSingleSubCategory = await subCategorySchema.findOne({ _id: id })
    // console.log(getSingleCategory)
    res.status(200).json({
        message: "get single category",
        statues: "success",
        data: getSingleSubCategory
    })
}

async function updateSingleSubCategoryCtrl(req, res) {
    try {
        const { id } = req.params
        console.log(id)
        const { subCategoryName, subCategoryDescription } = req.body
        const updateSubCategory = await subCategorySchema.findById(id)
        if (subCategoryName) {
            updateSubCategory.subCategoryName = subCategoryName;
        }
        if (subCategoryDescription) {
            updateSubCategory.subCategoryDescription = subCategoryDescription;
        }

        await updateSubCategory.save()
        res.status(200).json({ message: "subcategory updated successfully" })
    } catch (error) {
        res.status(401).json({ error: "internal server error", status: "failed" })
    }
}

async function deleteSubCategoryCtrl(req, res) {
    try {
        const { id } = req.params;

        // First, find and delete the subcategory
        const deletedSubCategory = await subCategorySchema.findByIdAndDelete(id);

        if (!deletedSubCategory) {
            return res.status(404).json({
                message: "SubCategory not found",
                status: "error"
            });
        }

        // Then, remove its name from the parent category's subCategory array
        await categorySchema.updateOne(
            { subCategory: deletedSubCategory.name },
            { $pull: { subCategory: deletedSubCategory.name } }
        );

        res.status(200).json({
            message: "SubCategory deleted successfully",
            data: deletedSubCategory
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
}

module.exports = { subCategoryCtrl, getAllSubCategoryCtrl, getSingleSubCategoryCtrl, updateSingleSubCategoryCtrl, deleteSubCategoryCtrl } 