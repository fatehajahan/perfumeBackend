const express = require("express")
const route = express.Router()

const apiRoute = require("./api")
const baseUrl = process.env.BASE_URL
route.use(baseUrl, apiRoute)

module.exports = route