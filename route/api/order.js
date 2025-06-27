const express = require("express")
const { orderCtrl, getAllOrderCtrl } = require("../../controllers/orderCtrl")

const route = express.Router()

route.post("/orderprocess", orderCtrl)
route.get("/getallorder", getAllOrderCtrl)

module.exports = route