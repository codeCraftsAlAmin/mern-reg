const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const config = require("../config/config");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxLength: [30, "Name is too long"],
      minLength: [2, "Name is too short"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
      validate: {
        validator: (value) => {
          return /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(
            value
          );
        },
        message: (props) => `${props.value} is not a valid email`,
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [5, "Password must be at least 5 character long"],
      set: (value) => bcrypt.hashSync(value, bcrypt.genSaltSync(10)),
    },
    image: {
      type: String,
      default: config.defImg.img,
    },
    address: {
      type: String,
      required: [true, "Address is required"],
    },
    phone: {
      type: String,
      required: [true, "Phone is required"],
      validate: {
        validator: (value) => {
          return /^(\+8801|8801|01)[3-9]\d{8}$/.test(value);
        },
        message: (props) => `${props.value} is not a valid phone number`,
      },
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isBanned: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },

    verificationCode: String,
    verificationExpiresAt: Date,
    resetPasswordToken: String,
    resetPasswordExpiresAt: String,
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
