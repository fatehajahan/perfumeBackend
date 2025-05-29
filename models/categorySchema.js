const mongoose = require("mongoose")
const { Schema } = mongoose

const categorySchema = new Schema({
    categoryName: {
        type: String,
        require: true,
        trim: true
    },
    categoryDescription: {
        type: String,
        require: true,
        trim: true
    },
    subCategory: [{
        // type: Schema.Types.ObjectId, (eta tokhn use korte hobe jokhn _id array te dibo.)
        type: String,
        ref: "SubcategoryList"
    }],
    product: [{
        type: String, 
        ref: "Product"
    }]  
})

module.exports = mongoose.model("CategoryList", categorySchema)
// Compare this snippet from controllers/categoryCtrl.js: