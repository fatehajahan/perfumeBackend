const express = require("express")
const route = express.Router()
const authRout = require("./authentication")
const categoryRoute = require("./category")
const subCategoryRoute = require("./subCategory")
const productRoute = require("./product")
const orderRoute = require("./order")

route.use("/authentication", authRout)
route.use("/category", categoryRoute) 
route.use("/subcategory", subCategoryRoute) 
route.use("/product", productRoute) 
route.use("/order", orderRoute) 

module.exports = route