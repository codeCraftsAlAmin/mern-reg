const cloudinary = require("cloudinary").v2;
const config = require("./config");

// configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloud_name,
  api_secret: config.cloudinary.api_secret,
  api_key: config.cloudinary.api_key,
});

module.exports = cloudinary;
