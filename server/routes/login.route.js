const express = require("express");

const {
  userLogin,
  userLogOut,
  handleRefreshToken,
  handleProtectedRoute,
} = require("../controllers/login.controller");
const { loginValidation } = require("../validators/auth");
const runValidation = require("../validators/runValidation");
const {
  isLoggedOut,
  isLoggedIn,
} = require("../middleware/user.authentication");
const router = express.Router();

// user login route
router.post("/login", loginValidation, runValidation, isLoggedOut, userLogin);

// user log out route
router.post("/logout", isLoggedIn, userLogOut);

// re-generate access token
router.get("/refresh-token", handleRefreshToken);

// protected route
router.get("/protected", handleProtectedRoute);

module.exports = router;
