const emailValidation = require("../helpers/emailValidation")
const emailVarification = require("../helpers/emailVarification")
const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt') // hash password
const crypto = require('crypto') // otp
const logInCtrl = require("./logInCtrl")

async function registrationCtrl(req, res) {
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName) return res.json({ error: 'Firstname & lastname are required' });
    if (!email) return res.json({ error: 'Email is required' });
    if (!emailValidation(email)) return res.json({ error: 'Email is not valid' });

    const existingEmail = await userSchema.findOne({ email });
    if (existingEmail) return res.json({ error: 'Email is already in use' });
    if (!password) return res.json({ error: 'Password is required' });

    const otp = crypto.randomInt(10000, 99999).toString();
    const otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    const hash = await bcrypt.hash(password, 10);

    const user = new userSchema({
      firstName,
      lastName,
      email,
      password: hash,
      otp,
      otpExpiry,
    });

    await user.save();

    // ✅ Respond immediately so frontend doesn’t wait
    res.status(200).json({
      message: 'Registration successful! Check your email for OTP.',
      status: 'success',
      data: user
    });

    // ✅ Send email afterward (non-blocking)
    emailVarification(email, otp)
      .then(() => console.log('OTP email sent to', email))
      .catch(err => console.error('Failed to send OTP:', err.message));

  } catch (err) {
    console.log('Registration error:', err);
    res.status(500).json({ error: 'Registration failed', details: err.message });
  }
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