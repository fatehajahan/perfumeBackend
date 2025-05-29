const express = require("express")
const { subCategoryCtrl, getAllSubCategoryCtrl, getSingleSubCategoryCtrl, updateSingleSubCategoryCtrl, deleteSubCategoryCtrl } = require("../../controllers/subCategoryCtrl")
const route = express.Router()

route.post("/createsubcategory", subCategoryCtrl)
route.get("/getallsubcategory", getAllSubCategoryCtrl)
route.get("/getallSingleSubcategory/:id", getSingleSubCategoryCtrl)
route.patch("/updatesinglesubcategory/:id", updateSingleSubCategoryCtrl)
route.delete("/deletesubcategory/:id", deleteSubCategoryCtrl)

module.exports = route