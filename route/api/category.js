const express = require("express")
const { categoryCtrl, getAllCategoryCtrl, getSingleCategoryCtrl, updateSingleCategoryCtrl, deleteCategoryCtrl } = require("../../controllers/categoryCtrl")
const route = express.Router()

route.post("/createcategory", categoryCtrl)
route.get("/getallcategory", getAllCategoryCtrl)
route.get("/getallSinglecategory/:id", getSingleCategoryCtrl)
route.patch("/updatesinglecategory/:id", updateSingleCategoryCtrl)
route.delete("/deletecategory/:id", deleteCategoryCtrl)

module.exports = route