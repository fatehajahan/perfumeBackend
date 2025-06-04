const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String
    },
    price: {
        type: String
    },
    fragrance: {
        type: String
    },
    images: {
        type: [String]
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: "CategoryList"
    },
    subCategory: {
        type: Schema.Types.ObjectId,
        ref: "SubcategoryList"
    },
    discount: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
