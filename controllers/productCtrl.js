const uploadImage = require("../middleware/cloudinary")
const categorySchema = require("../models/categorySchema")
const productSchema = require("../models/productSchema")

async function productCtrl(req, res) {
    try {
        const { name, description, price, fragrance, category, subCategory, discount } = req.body;

        // Validate required fields first
        if (!name || !price || !description || !fragrance || !category) {
            return res.status(400).json({ message: "All fields are required" });
        }

        // Find category
        const foundCategory = await categorySchema.findOne({ categoryName: category });
        console.log(foundCategory)
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        // handle image upload
        const imgUrls = [];
        for (const file of req.files) {
            const imgPath = file.path;
            const imgUrl = await uploadImage(imgPath);
            imgUrls.push(imgUrl.secure_url);
        }

        // Create new product
        const product = new productSchema({
            name,
            description,
            price,
            fragrance,
            images: imgUrls,
            subCategory,
            category: foundCategory.categoryName,
            discount
        });
        await product.save()

        // Update category with product
        await categorySchema.findOneAndUpdate(
            { categoryName: category },
            { $push: { product: product.name } },
            { new: true }
        );

        res.status(200).json({
            message: "product created successfully", status: "success",
            data: product
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: "product creation failed", statues: "Failed"
        })
    }
}
async function getAllProductCtrl(req, res) {
    try {
        const allProduct = await productSchema.find({})
        res.status(200).json({
            message: "get all category",
            statues: "success",
            data: allProduct
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}

async function getSingleProductCtrl(req, res) {
    const { id } = req.params //we need to use params when we need id. 
    const getSingleProduct = await productSchema.findOne({ _id: id })

    res.status(200).json({
        message: "get single category",
        statues: "success",
        data: getSingleProduct
    })
}

async function updateSingleProductCtrl(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, fragrance, category, subCategory, discount } = req.body;

        const foundCategory = await categorySchema.findOne({ categoryName: category });
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found" });
        }

        const updateData = {
            name,
            description,
            price,
            fragrance,
            category: foundCategory.categoryName,
            subCategory,
            discount,
        };

        // Handle image if uploaded
        if (req.file) {
            const imgPath = req.file.path;
            const imgUrl = await uploadImage(imgPath);
            updateData.image = imgUrl.secure_url;
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            data: updatedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function deleteProduct(req, res) {
    try {
        const { id } = req.params;
        const deleteProduct = await productSchema.findByIdAndDelete(id);

        res.status(200).json({
            message: "Category deleted successfully",
            data: deleteProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            status: "error"
        });
    }
}
module.exports = { productCtrl, getAllProductCtrl, deleteProduct, updateSingleProductCtrl, getSingleProductCtrl }
