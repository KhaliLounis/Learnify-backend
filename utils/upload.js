const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadImage = async (file, folderName) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      use_filename: true,
      folder: folderName,
    });
    return result.secure_url;
  } catch (error) {
    console.log(error);
    throw new Error("Image upload failed");
  }
};

const uploadDocument = async (file) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "raw", folder: "module-content" },
      (error, result) => {
        if (error) {
          reject(new Error("Document upload failed: " + error.message));
        } else {
          resolve(result.secure_url);
        }
      },
    );

    file.stream.pipe(uploadStream); // Ensure the file is a readable stream
  });
};

(module.exports = uploadImage), uploadDocument;
