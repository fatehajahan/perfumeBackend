const express = require("express")
const { registrationCtrl, userListsCtrl, allUserListsCtrl } = require("../../controllers/registrationCtrl")
const { otpCtrl, resendOtpCtrl } = require("../../controllers/otpCtrl")
const { logInCtrl, dashBoard, logout, getCurrentUser, } = require("../../controllers/logInCtrl")
const authMiddleware = require("../../middleware/authMiddleware")
const roleMiddleware = require("../../middleware/roleMiddelware")

const route = express.Router()

route.post("/registration", registrationCtrl)
route.get("/allUsers", allUserListsCtrl)
route.get("/lastUser", userListsCtrl)
route.post("/otpVerify", otpCtrl)
route.post("/resendOtp", resendOtpCtrl)
route.post("/login", logInCtrl)
route.get("/currentuser", getCurrentUser)
route.post("/logout", logout)

//all gets

route.get("/admin-dashboard", authMiddleware, roleMiddleware("admin"), dashBoard) //will check if if user is admin or not
route.get("/user-dashboard", authMiddleware, roleMiddleware("user"), dashBoard) //will check if if user is admin or not

module.exports = route