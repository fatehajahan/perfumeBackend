const mongoose = require("mongoose")
const { Schema } = mongoose

const categorySchema = new Schema({
    categoryName: {
        type: String,
        required: true,
        trim: true
    },
    categoryDescription: {
        type: String,
        required: true,
        trim: true
    },
    subCategory: [{
        type: Schema.Types.ObjectId,
        ref: "SubcategoryList",
        default: []
    }],
    product: [{
        type: Schema.Types.ObjectId,
        ref: "Product",
        default: []
    }]
});


module.exports = mongoose.model("CategoryList", categorySchema)
// Compare this snippet from controllers/categoryCtrl.js: