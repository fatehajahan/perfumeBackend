const nodemailer = require("nodemailer");

async function emailVarification(email, otp) {
    const transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
            user: process.env.MAILTRAP_USER,
            pass: process.env.MAILTRAP_PASS
        }
    });

    try {
        const info = await transporter.sendMail({
            from: "perfume@mailtrap.io",
            to: email,
            subject: "Perfume: OTP Verification",
            text: `Your OTP is ${otp}`
        });

        console.log("Email sent:", info.response);
    } catch (err) {
        console.log("Nodemailer error:", err);
    }
}

module.exports = emailVarification;
