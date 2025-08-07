const { check } = require("express-validator");

// registration validation
const registrationValidation = [
  // name validation
  check("name")
    .trim()
    .notEmpty()
    .withMessage("Name is required")
    .isLength({ min: 2 })
    .withMessage("Name length must be at least 2 characters long"),
  // email validation
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail(),
  // password validation
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  // image validation
  check("image").optional(),
  // address validation
  check("address").trim().notEmpty().withMessage("Address is required"),
  // phone validation
  check("phone")
    .trim()
    .notEmpty()
    .withMessage("Phone is required")
    .matches(/^(\+8801|8801|01)[3-9]\d{8}$/)
    .withMessage("Phone number isn't valid"),
];

// update password validation
const updatedPasswordValidation = [
  // old pass
  check("oldPass")
    .trim()
    .notEmpty()
    .withMessage("Old password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  // new pass
  check("newPass")
    .trim()
    .notEmpty()
    .withMessage("New password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
  check("confirmNewPass").custom((value, { req }) => {
    if (value !== req.body.newPass) {
      throw new Error("Confirm pass didn't match with new pass");
    }
    return true;
  }),
];

// forget password validation
const forgetPassEmail = [
  // email validation
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail(),
];

// reset password validation
const resetPassValidation = [
  // token validation
  check("token").trim().notEmpty().withMessage("Token is required"),
  // password validation
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

// login validation
const loginValidation = [
  // email validation
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Not a valid email")
    .normalizeEmail(),
  // password validation
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 5 })
    .withMessage("Password must be at least 5 characters long"),
];

module.exports = {
  registrationValidation,
  updatedPasswordValidation,
  forgetPassEmail,
  resetPassValidation,
  loginValidation,
};
