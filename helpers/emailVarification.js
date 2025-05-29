const nodemailer = require("nodemailer")

async function emailVarification(email, otp) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "fatehajahan2002@gmail.com",
            pass: "lbcmlmggrvyvmryj",
        },
    });

    const info = await transporter.sendMail({
        from: '"PerfumeShop 👻" <fatehajahan2002@gmail.com>',
        to: email, 
        subject: "Hello ✔", 
        text: "Hello world?", 
        html: `<b>This is a perfume shop. here is your OTP : ${otp}</b>`, 
    });
}

module.exports = emailVarification