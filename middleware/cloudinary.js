const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
});


const uploadImage = async (imgUrlPath) => {

    try {
        if (!imgUrlPath) return null
        const result = await cloudinary.uploader.upload(imgUrlPath)
        fs.unlinkSync(imgUrlPath)
        return result
    } catch (error) {
        console.log(error);
        try {
            fs.unlinkSync(imgUrlPath);
        } catch (err) {
            console.log("Error deleting file:", err);
        }
        return null; 
    }
}

module.exports = uploadImage