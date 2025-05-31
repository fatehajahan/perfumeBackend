const express = require("express")
const { productCtrl, getAllProductCtrl, deleteProduct, updateSingleProductCtrl } = require("../../controllers/productCtrl")
const multer = require('multer')
const route = express.Router()

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './upload')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + `.${file.originalname.split(".")[1]}`)
        console.log(file.originalname.split(".")[1])
    }
})

const upload = multer({ storage: storage })

route.post("/createproduct",
    upload.array("images", 4),
    productCtrl)
route.get("/getallproduct", getAllProductCtrl)
route.patch("/updatesingleproduct/:id", upload.array("images", 4), updateSingleProductCtrl)
route.delete("/deleteproduct/:id", deleteProduct)
 
module.exports = route