const mongoose = require("mongoose")
const { Schema } = mongoose

const subCategorySchema = new Schema({
    subCategoryName: {
        type: String,
        require: true,
        trim: true
    },
    subCategoryDescription: {
        type: String,
        require: true,
        trim: true
    }, 
    category :[{
        // type: Schema.Types.ObjectId,(eta tokhn use korte hobe jokhn _id array te dibo.)
        type: String,
        ref: "CategoryList",
        require: true
    }],
})

module.exports = mongoose.model("SubcategoryList", subCategorySchema)