// https://res.cloudinary.com/dpowpvcm0/image/upload/v1748855607/merReg/users/kgjknacj2j0qphqr3dfi.jpg

// last sagment = kgjknacj2j0qphqr3dfi.jpg

const cloudinary = require("../config/cloudinary");

// split public id
const getPublicId = (imgUrl) => {
  try {
    // separate path
    const pathSagment = imgUrl.split("/");

    // get last sagment
    const lastSagment = pathSagment[pathSagment.length - 1];

    // split extension from last sagment
    const valueWithoutExt = lastSagment.replace(".jpg", "");

    return valueWithoutExt;
  } catch (error) {
    throw error;
  }
};

// delete file from cloudinary
const deleteFileFromCloudinary = async (folderName, publicId, model) => {
  try {
    const { result } = await cloudinary.uploader.destroy(
      `${folderName}/${publicId}`
    );

    if (result !== "ok")
      throw new Error(
        `${model} image isn't deleted successfully, please try again`
      );

    return result;
  } catch (error) {
    throw error;
  }
};

module.exports = { getPublicId, deleteFileFromCloudinary };
