import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

const uploadOnCloudinary = async (filePath) => {

    cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_APIKEY,
        api_secret: process.env.CLOUDINARY_APISECRET
    });

    try {

        if (!filePath) {
            return null;
        }

        // Upload image to Cloudinary
        const uploadResult = await cloudinary.uploader.upload(filePath);

        // Delete local file only if it exists
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return uploadResult.secure_url;

    } catch (error) {

        console.log("CLOUDINARY UPLOAD ERROR:", error);

        // Delete local file only if it exists
        if (filePath && fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        return null;
    }
};

export default uploadOnCloudinary;