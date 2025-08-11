require('dotenv').config(); // Make sure env is loaded here

const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'file-upload',
    allowedFormats: ['jpg', 'png', 'pdf', 'mp4'],  // <-- camelCase fixed
  },
});

const upload = multer({ storage });

module.exports = upload;
