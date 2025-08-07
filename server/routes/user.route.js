const express = require("express");

const {
  getAllUsers,
  getUserById,
  deleteUserById,
  processRegister,
  verifyUser,
  resendVerification,
  updateUserById,
  updatePassword,
  forgetPassword,
  resetPassword,
  handleUserActionById,
} = require("../controllers/user.controller");
const uploadUserImage = require("../middleware/user.upload");
const {
  registrationValidation,
  updatedPasswordValidation,
  forgetPassEmail,
  resetPassValidation,
} = require("../validators/auth");
const runValidation = require("../validators/runValidation");
const {
  isLoggedIn,
  isAdmin,
  isLoggedOut,
} = require("../middleware/user.authentication");
const router = express.Router();

// get all users route
router.get("/users", isLoggedIn, isAdmin, getAllUsers);

// find user by id route
router.get("/users/:id", isLoggedIn, getUserById);

// delete user route
router.delete("/users/:id", isLoggedIn, deleteUserById);

// register process route
router.post(
  "/process-register",
  isLoggedOut,
  uploadUserImage.single("image"),
  registrationValidation,
  runValidation,
  processRegister
);

// verify user route
router.post("/verify", isLoggedOut, verifyUser);

// resend verification route
router.post("/resend-verification", resendVerification);

// upadate user route
router.put(
  "/users/:id",
  isLoggedIn,
  uploadUserImage.single("image"),
  updateUserById
);

// update password route
router.put(
  "/password-update/:id",
  isLoggedIn,
  updatedPasswordValidation,
  runValidation,
  updatePassword
);

// forget password route
router.post("/forget-password", forgetPassEmail, runValidation, forgetPassword);

// reset password route
router.put(
  "/reset-password",
  resetPassValidation,
  runValidation,
  resetPassword
);

// user action route
router.put("/action-user/:id", isLoggedIn, isAdmin, handleUserActionById);

module.exports = router;
