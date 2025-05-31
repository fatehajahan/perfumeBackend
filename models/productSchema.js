const mongoose = require("mongoose")
const { Schema } = mongoose

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        // required: true,
    },
    price: {
        type: String,
        // required: true
    },
    fragrance: {
        type: String
    },
    images: {
        type: [String]
    },
    category: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "CategoryList",
        // required: true
    },
    subCategory: {
        // type: Schema.Types.ObjectId,
        type: String,
        ref: "SubcategoryList",
    },
    discount: {
        type: String,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model("Product", productSchema)