const multer = require("multer");
const createError = require("http-errors");

const { usersFileDirectory, fileSize, fileType } = require("../config/file");

// multer diskStorage
const userStorage = multer.diskStorage({
  // destination: function (req, file, cb) {
  //   cb(null, usersFileDirectory);
  // },  // use destination before upload file to cloudinary
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// file filtering
const fileFilter = (req, file, cb) => {
  // check file types errro
  // mimetype = media type
  if (!fileType.includes(file.mimetype)) {
    return cb(createError(400, "File type isn't allowed"));
  }
  return cb(null, true);
};

// upload user image
const uploadUserImage = multer({
  storage: userStorage,
  limits: {
    fileSize: fileSize,
    fileFilter: fileFilter,
  },
});

module.exports = uploadUserImage;
