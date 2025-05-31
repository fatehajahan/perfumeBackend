const emailValidation = require("../helpers/emailValidation")
const userSchema = require("../models/userSchema")
const bcrypt = require('bcrypt')

async function logInCtrl(req, res) {
    const { email, password } = req.body;

    // Step 1: Check for missing inputs
    if (!email || !password) {
        return res.status(400).json({ success: false, error: 'Email and password are required' });
    }

    // Step 2: Validate email format
    if (!emailValidation(email)) {
        return res.status(400).json({ success: false, error: 'Invalid email format' });
    }

    // Step 3: Check if user exists
    const existingUser = await userSchema.findOne({ email });
    if (!existingUser) {
        return res.status(404).json({ success: false, error: 'Email is not registered' });
    }

    // Step 4: Check if email is verified
    if (!existingUser.isVarified) {
        return res.status(403).json({ success: false, error: 'Email is not verified' });
    }

    // Step 5: Compare password
    const isMatched = await bcrypt.compare(password, existingUser.password);
    if (!isMatched) {
        return res.status(401).json({ success: false, error: 'Incorrect password' });
    }

    // Step 6: Set session and return success
    req.session.isAuth = true;
    req.session.user = {
        id: existingUser._id,
        email: existingUser.email,
        firstName: existingUser.firstName,
        role: existingUser.role
    };
    req.session.save();
    return res.status(200).json({ success: true, message: 'Login successful' });
}

function logout(req, res) {
    req.session.destroy(function (err) {
        if (err) {
            return res.status(404).json({ error: 'error is logout' })
        }
    })
    res.clearCookie("connect.sid")
    res.status(200).json({ message: 'logout successfully done' })
}

function dashBoard(req, res) {
    if (!req.session.isAuth) {
        return res.json({ error: 'unauthorized' })
    }
    if (req.session.user.role == 'admin') {
        return res.status(200).json({ message: `welcome to admin dashboard : ${req.session.user.firstName}` })
    } else {
        return res.status(200).json({ message: `welcome to user dashboard : ${req.session.user.firstName}` })
    }
}

function getCurrentUser(req, res) {
    console.log(req.session.user)
    res.send(req.session.user)
}

module.exports = { logInCtrl, dashBoard, logout, getCurrentUser }