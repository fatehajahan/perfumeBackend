const mongoose = require("mongoose")
const { Schema } = mongoose

const subCategorySchema = new Schema({
    subCategoryName: {
        type: String,
        required: true,
        trim: true
    },
    subCategoryDescription: {
        type: String,
        required: true,
        trim: true
    },
    category: [{
        type: Schema.Types.ObjectId,
        ref: "CategoryList",
        required: true
    }]
});


module.exports = mongoose.model("SubcategoryList", subCategorySchema)