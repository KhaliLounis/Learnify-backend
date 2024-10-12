const cloudinary = require('cloudinary').v2;

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
      throw new Error('Image upload failed');
    }
  };

const uploadDocument = async (file) => {
    try {
      const result = await cloudinary.uploader.upload(file.tempFilePath, {
        use_filename: true,
        folder: 'module-content',
        resource_type: 'raw', // Use 'raw' for documents, videos, etc.
      });
      return result.secure_url;
    } catch (error) {
      throw new Error('Document upload failed');
    }
  };
  
module.exports = uploadImage, uploadDocument;
