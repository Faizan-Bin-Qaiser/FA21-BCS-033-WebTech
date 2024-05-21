const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({
    cloud_name: "dlrwpcxud",
    api_key: "666271447289868",
    api_secret: "8b6O0vNx719u5Ne9G-lP2fQRHBg",
});

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null;

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: "auto",
        });

        if (response) {
            console.log("File has been uploaded on Cloudinary:", response.url);
        }

        fs.unlinkSync(localfilepath);

        return response.url;
    } catch (error) {
        console.error("Error uploading image to Cloudinary:", error);
        fs.unlinkSync(localfilepath);
        return null;
    }
};

module.exports = { uploadOnCloudinary };