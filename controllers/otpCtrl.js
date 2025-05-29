const userSchema = require("../models/userSchema")
const crypto = require('crypto')

async function otpCtrl(req, res) {
    const { email, otp } = req.body

    const user = await userSchema.findOne({ email })
    if (!user) {
        return res.status(400).json({ messgae: "user not found" })
    }

    if (user.isVarified) {
        return res.json({ messgae: 'user is verified' })
    }
    if (user.otp !== otp || user.expiredOtp > Date.now()) {
        return res.status(400).json({ error: 'Invalid OTP' })
    }

    // user.isVarified = true;
    // user.otp = undefined;
    // user.expiredOtp = undefined;
    // await user.save();

    await userSchema.findOneAndUpdate(
        { email },
        {
            $set: { isVarified: true },
            $unset: { otp: "", expiredOtp: "" }
        },
        { new: true }
    )

    res.status(200).json({ messgae: 'user is verified' })
}

async function resendOtpCtrl(req, res) {
    const { email } = req.body
    if (!email) {
        return res.json({ message: 'please provide your email.' })
    }

    // const user = await userSchema.find({ email })
    const otp = crypto.randomInt(10000, 99999).toString()

    const otpExpiry = new Date(Date.now() + 1 * 60 * 1000)

    // user.otp = otp
    // user.expiredOtp = otpExpiry
    // await user.save()

    await userSchema.findOneAndUpdate(
        { email },
        { $set: { otp,  otpExpiry } },
        { new: true }
    );

    res.json({ message: 'new OTP has been sent' })
}

module.exports = { otpCtrl, resendOtpCtrl }