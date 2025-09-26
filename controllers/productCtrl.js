const uploadImage = require("../middleware/cloudinary");
const categorySchema = require("../models/categorySchema");
const productSchema = require("../models/productSchema");

async function productCtrl(req, res) {
    try {
        const { name, description, price, fragrance, category, subCategory, discount } = req.body;

        if (!name || !price || !description || !fragrance || !category) {
            return res.status(400).json({ message: "All fields are required", status: "failed" });
        }

        const foundCategory = await categorySchema.findById(category);
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found", status: "failed" });
        }

        const imgUrls = [];
        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const imgUrl = await uploadImage(file.buffer);
                if (imgUrl) imgUrls.push(imgUrl.secure_url);
            }
        }

        const product = new productSchema({
            name,
            description,
            price,
            fragrance,
            images: imgUrls,
            subCategory,
            category: foundCategory._id,
            discount
        });
        await product.save();

        await categorySchema.findByIdAndUpdate(
            foundCategory._id,
            { $push: { product: product._id } },
            { new: true }
        );

        res.status(201).json({
            message: "Product created successfully",
            status: "success",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Product creation failed", status: "failed" });
    }
}

async function getAllProductCtrl(req, res) {
    try {
        const page = parseInt(req.query.page - 1)
        const productPerPage = parseInt(req.query.size)

        const totalProducts = await productSchema.countDocuments(); //koyta product ache

        const allProducts = await productSchema.find({}).limit(productPerPage).skip(page * productPerPage)
        res.status(200).json({
            message: "Fetched all products",
            status: "success",
            data: allProducts,
            totalProducts: totalProducts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function getSingleProductCtrl(req, res) {
    try {
        const { id } = req.params;
        const product = await productSchema.findById(id);
        if (!product) {
            return res.status(404).json({ error: "Product not found", status: "failed" });
        }
        res.status(200).json({
            message: "Fetched single product",
            status: "success",
            data: product
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

async function updateSingleProductCtrl(req, res) {
    try {
        const { id } = req.params;
        const { name, description, price, fragrance, category, subCategory, discount } = req.body;

        const foundCategory = await categorySchema.findById(category);
        if (!foundCategory) {
            return res.status(404).json({ message: "Category not found", status: "failed" });
        }

        const updateData = {
            name,
            description,
            price,
            fragrance,
            category: foundCategory._id,
            subCategory,
            discount
        };

        if (req.file) {
            const imgUrl = await uploadImage(req.file.path);
            updateData.images = [imgUrl.secure_url];
        }

        const updatedProduct = await productSchema.findByIdAndUpdate(id, updateData, { new: true });
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found", status: "failed" });
        }

        res.status(200).json({
            message: "Product updated successfully",
            status: "success",
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
        const deletedProduct = await productSchema.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: "Product not found", status: "failed" });
        }

        res.status(200).json({
            message: "Product deleted successfully",
            status: "success",
            data: deletedProduct
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error", status: "failed" });
    }
}

module.exports = {
    productCtrl,
    getAllProductCtrl,
    getSingleProductCtrl,
    updateSingleProductCtrl,
    deleteProduct
};
