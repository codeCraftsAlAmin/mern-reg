const mongoose = require("mongoose");
const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const jwtToken = require("../helper/use.jwt");

const createError = require("http-errors");
const User = require("../models/user.model");
const {
  getPublicId,
  deleteFileFromCloudinary,
} = require("../helper/cloudinaryHelper");
const config = require("../config/config");
const cloudinary = require("../config/cloudinary");
const setEmailData = require("../helper/setEmailData");
const findUserById = require("../helper/user.find");

// find all users service
const getAllUserService = async (search, page, limit) => {
  try {
    // search expression
    const searchRegExp = new RegExp(".*" + search + ".*", "i");

    // search user by name, phone and email
    const filter = {
      isAdmin: { $ne: true },
      $or: [
        { name: { $regex: searchRegExp } },
        { email: { $regex: searchRegExp } },
        { phone: { $regex: searchRegExp } },
      ],
    };

    const users = await User.find(filter)
      .limit(limit)
      .select("-password")
      .skip((page - 1) * limit); // prev 5 users will be replaced in new page

    const count = await User.find(filter).countDocuments();

    if (!count) throw createError(404, "Users not found");

    return {
      users,
      pagination: {
        totalPage: Math.ceil(count / limit),
        currPage: page,
        prevPage: page - 1 > 0 ? page - 1 : null,
        nextPage: page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
      },
    };
  } catch (error) {
    throw error;
  }
};

// find user by id service
const findUserService = async (id) => {
  try {
    const user = await User.findById({ _id: id }).select("-password");

    if (!user) throw createError(404, "User not found");

    return user;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(404, "Invalid mongoose id");
    }

    throw error;
  }
};

// delete user service
const deleteUserService = async (id) => {
  try {
    // delete user
    const user = await User.findByIdAndDelete(id);

    // delete file from cloudinary
    const defImage = config.defImg.img;
    if (user && user.image !== defImage) {
      const publicId = await getPublicId(user.image);

      await deleteFileFromCloudinary("mernReg/users", publicId, "Users");
    }
  } catch (error) {
    throw error;
  }
};

// register service
const registerService = async (
  name,
  email,
  password,
  address,
  phone,
  image
) => {
  try {
    if (image && image.size > 1024 * 1024 * 2) {
      throw createError(
        400,
        "File is too long to upload. It must be less than 2 MB"
      );
    }

    // check if user exists or not
    const existedUser = await User.exists({ email });

    if (existedUser) throw createError(409, "Email is already in use");

    // create verification code
    const verificationCode = crypto.randomInt(100000, 1000000).toString();

    // create verification expiresAt
    const verificationExpiresAt = Date.now() + 3 * 60 * 1000; // 3mins

    // save the new user
    await User.create({
      name,
      email,
      password,
      address,
      phone,
      image,
      verificationCode,
      verificationExpiresAt,
    });

    // send verifiaction email to new user
    const emailData = {
      email,
      subject: "Verification mail",
      html: `
          <h2>Hello ${name} !</h2>
          <p>Your new verification code is: ${verificationCode}</p>
          <p>It will expire after: 3 minutes</p>
          `,
    };

    await setEmailData(emailData);

    return { verificationExpiresAt };
  } catch (error) {
    throw error;
  }
};

// verify service
const verifyService = async (email, verificationCode) => {
  try {
    // check if user exists
    const user = await User.findOne({ email });

    if (!user) throw createError(404, "User not found");

    // check if user isVerified
    if (user.isVerified) throw createError(400, "User already verified");

    // check if user verification is correct
    if (verificationCode !== user.verificationCode)
      throw createError(400, "Invalid verification code");

    // check if user is verificationExpiresAt
    if (user.verificationExpiresAt < Date.now())
      throw createError(400, "Verification time is expired");

    // upload image to cloudinary
    const image = user.image;

    if (image && image !== config.defImg.img) {
      const uploadResult = await cloudinary.uploader
        .upload(image, {
          folder: "mernReg/users",
        })
        .catch((error) => {
          console.log(error);
        });

      // console.log(uploadResult);
      user.image = uploadResult.secure_url; // add image to db
    }

    // update user
    user.isVerified = true;
    user.verificationCode = null;
    user.verificationExpiresAt = null;

    await user.save();
  } catch (error) {
    throw error;
  }
};

// resend verification service
const resendVerificationService = async (email) => {
  try {
    // check if it exists
    const user = await User.findOne({ email });
    if (!user) throw createError(400, "Invalid email account");

    // check if user isVerified
    if (user.isVerified) throw createError(400, "User is already verified");

    // re-create verification code
    const verificationCode = crypto.randomInt(100000, 1000000).toString();

    // re-create verification expiresAt
    const verificationExpiresAt = Date.now() + 1 * 60 * 1000; // 3mins

    user.verificationCode = verificationCode;
    user.verificationExpiresAt = verificationExpiresAt;

    await user.save();

    return verificationExpiresAt;
  } catch (error) {
    throw error;
  }
};

// update user service
const updateUserService = async (id, req) => {
  try {
    // find user by id
    const user = await findUserService(id);

    // add options
    const updateOption = { new: true, runValidators: true, context: "query" };

    // update user info
    let updates = {};

    for (let key in req.body) {
      if (["name", "address", "phone"].includes(key)) {
        updates[key] = req.body[key];
      } else if (key === "email" || key === "password") {
        throw createError(400, "It can not be updated");
      }
    }

    // update user imgae
    const image = req.file?.path;

    // update image
    if (image) {
      try {
        // upload new image to cloudinary
        const uploadResult = await cloudinary.uploader.upload(image, {
          folder: "mernReg/users",
        });

        // console.log(uploadResult);
        updates.image = uploadResult.secure_url; // add image to db

        // delete prev image from cloudinary
        if (user?.image) {
          const publicId = await getPublicId(user.image);
          await deleteFileFromCloudinary("mernReg/users", publicId, "Users");
        }
      } catch (error) {
        console.log("Cloudinary upload or delete error: ", error);
      }
    }

    // now update user
    const updatedUser = await User.findByIdAndUpdate(
      id,
      updates,
      updateOption
    ).select("-password");

    if (!updatedUser) throw createError(404, "User doesn't exist with this id");

    return updatedUser;
  } catch (error) {
    if (error.name === "ValidationError") {
      // console.log(Object.values(error.errors)[0].message);
      const errorMessage = Object.values(error.errors)[0].message;
      throw createError(404, errorMessage);
    }
    throw error;
  }
};

// update password service
const updatePasswordService = async (id, req) => {
  try {
    // find user by id
    const user = await findUserById(User, id);

    // take user old, new, and confirm new password form user
    const { oldPass, newPass, confirmNewPass } = req.body;

    // check if old password matchs with db
    const matchPass = await bcrypt.compare(oldPass, user.password);

    if (!matchPass) throw createError(404, "Old password didn't match");

    // check if new matchs with confNew
    if (newPass !== confirmNewPass)
      throw createError(
        404,
        "Your new password didn't match with confirm new password"
      );

    // update password
    const update = { $set: { password: newPass } };
    const updateOption = { new: true };

    await User.findByIdAndUpdate(id, update, updateOption).select("-password");
  } catch (error) {
    throw error;
  }
};

// forget password service
const forgetPassService = async (email) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw createError(404, "Email not found");

    // generate jwt token
    const token = await jwtToken(
      { email }, // payload
      config.secret_key.forget_pass_key, // sec_key
      "10m" // exp_time
    );

    // prepare a email for user
    const emailData = {
      email,
      subject: "Password Reset",
      html: `
              <h2>Hello ${user.name} !</h2>
              <p>Please click here to <a href="${config.client.url}/reset-password/${token}" target="_blank"> reset your password</a></p>
              <p>This link will expire in 10 minutes.</p>
              <p>If you didn't request this, please ignore this email.</p>
              `,
    };

    await setEmailData(emailData);

    return token;
  } catch (error) {
    throw error;
  }
};

// reset password service
const resetPasswordService = async (token, password) => {
  try {
    // decode the token and check if it is valid or not
    const decoded = jwt.verify(token, config.secret_key.forget_pass_key);

    if (!decoded) throw createError(400, "Invalid or expired token");

    // reset password
    filter = { email: decoded.email };
    update = { $set: { password: password } };
    options = { new: true };

    // save new info in db
    const resetPass = await User.findOneAndUpdate(
      filter,
      update,
      options
    ).select("-password");

    if (!resetPass)
      throw createError(400, "Resetting the password didn't work");
  } catch (error) {
    throw error;
  }
};

// user action service
const userActionService = async (id, action) => {
  try {
    // check if user exists or not
    const user = await findUserById(User, id);

    // handle action
    let update;
    let successMessage;

    if (action === "ban") {
      update = { isBanned: true };
      successMessage = `${user.name} is banned successfully`;
    } else if (action === "unban") {
      update = { isBanned: false };
      successMessage = `${user.name} is unbanned successfully`;
    } else if (action === "makeAdmin") {
      update = { isAdmin: true };
      successMessage = `${user.name} is admin now`;
    } else if (action === "removeAdmin") {
      update = { isAdmin: false };
      successMessage = `${user.name} is removed from admin now`;
    } else {
      throw createError(400, "Invalid action");
    }

    // handle options
    const options = { new: true, runValidators: true, context: "query" };

    // update action
    const updatedAction = await User.findByIdAndUpdate(
      id,
      update,
      options
    ).select("-password");

    if (!updatedAction)
      throw createError(400, "User isn't updated successfully");

    return successMessage;
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getAllUserService,
  findUserService,
  deleteUserService,
  registerService,
  verifyService,
  resendVerificationService,
  updateUserService,
  updatePasswordService,
  forgetPassService,
  resetPasswordService,
  userActionService,
};
