const nodemailer = require("nodemailer")

async function emailVarification(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fatehajahan2002@gmail.com",
            pass: "qzpsbbnkucntwqvv",
        },
    });

    try {
        const info = await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Perfume: OTP Verification",
            text: `Your OTP is ${otp}`
        });
        console.log("Email sent:", info.response);
    } catch (err) {
        console.log("Nodemailer error:", err);
    }
}

module.exports = emailVarification