const cloudinary = require("cloudinary").v2;
const fs = require("fs")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET_KEY
});


const uploadImage = async (fileBuffer) => {
    try {
        if (!fileBuffer) return null;

        // Cloudinary upload using "stream" method for buffer
        const streamUpload = (buffer) => {
            return new Promise((resolve, reject) => {
                const stream = cloudinary.uploader.upload_stream(
                    { folder: "products" }, // optional: store in folder
                    (error, result) => {
                        if (result) resolve(result);
                        else reject(error);
                    }
                );
                stream.end(buffer);
            });
        };

        const result = await streamUpload(fileBuffer);
        return result;
    } catch (error) {
        console.log("Cloudinary upload error:", error);
        return null;
    }
};


module.exports = uploadImage