const emailValidation = require("../helpers/emailValidation")
const emailVarification = require("../helpers/emailVarification")
const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt') // hash password
const crypto = require('crypto') // otp
const logInCtrl = require("./logInCtrl")

async function registrationCtrl(req, res) {
    const { firstName, lastName, email, password } = req.body
    if (!firstName || !lastName) {
        return res.json({ error: 'firstname & lastname is required ' })
    }
    if (!email) {
        return res.json({ error: 'email is required' })
    }

    if (!emailValidation(email)) {
        return res.json({ error: 'email is not valid' })
    }
    const exsistingEmail = await userSchema.find({ email }) // ashte deri hobe
    if (exsistingEmail.length > 0) {
        return res.json({ error: 'email is in use' })
    }

    if (!password) {
        return res.json({ error: 'password is required' })
    }

    const otp = crypto.randomInt(10000, 99999).toString()
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000)

    bcrypt.hash(password, 10, function (err, hash) {
        const users = new userSchema({
            firstName,
            lastName,
            email,
            password: hash,
            otp,
            otpExpiry,
        })
        emailVarification(email, otp)
        users.save()
    })

    res.status(200).json({
        message: 'registration done',
        status: 'success',
    })
}
// for all users
async function allUserListsCtrl(req, res) {
    try {
        const allusers = await userSchema.find({})
        res.status(200).json({
            message: "get all users",
            statues: "success",
            data: allusers
        })
    } catch (error) {
        res.status(400).json({ error: "internal server error", statues: "failed" })
    }
}

// get the last user
async function userListsCtrl(req, res) {
    try {
        const latestUser = await userSchema.findOne().sort({ createdAt: -1 }).limit(1);
        res.status(200).json({
            message: "Fetched latest user",
            status: "success",
            data: latestUser
        });
    } catch (error) {
        res.status(400).json({ error: "Internal server error", status: "failed" });
    }
}

module.exports = { registrationCtrl, userListsCtrl, allUserListsCtrl }