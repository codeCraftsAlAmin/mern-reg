const { setRefreshToken, setAccessToken } = require("../helper/user.token");
const User = require("../models/user.model");
const config = require("../config/config");
const jwtToken = require("../helper/use.jwt");
const createError = require("http-errors");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// user login service
const userLoginService = async (res, email, password) => {
  try {
    // check if user exists or not
    const user = await User.findOne({ email });

    if (!user) throw createError(404, "Invalid email");

    // check user password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) throw createError(401, "Wrong password");

    // check if user isBanned
    if (user.isBanned)
      throw createError(
        403,
        "You are banned from this website, please contanct with admin"
      );

    // generate access token
    let payload = { user };

    const accessKey = config.key.access_key;

    const accessToken = await jwtToken(payload, accessKey, "15m");

    await setAccessToken(res, accessToken);

    // generate refresh token
    const refreshKey = config.key.refresh_key;

    const refreshToken = await jwtToken(payload, refreshKey, "7d");

    await setRefreshToken(res, refreshToken);

    // update last login
    user.lastLogin = new Date();
    await user.save();

    // login user
    const loggedUser = await User.findOne({ email }).select("-password");

    return loggedUser;
  } catch (error) {
    throw error;
  }
};

// user log out service
const userLogOutService = async (res) => {
  try {
    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
    });
  } catch (error) {
    throw error;
  }
};

// regenerate access token servoice
const handleRefreshTokenService = async (req, res) => {
  try {
    // take old refresh token
    const oldRefreshToken = req.cookies.refreshToken;

    if (!oldRefreshToken)
      throw createError(
        401,
        "Refresh token either invalid or exipired, please login again"
      );

    // verify old token
    const decoded = jwt.verify(oldRefreshToken, config.key.refresh_key);

    // generate access token
    const payload = decoded.user;

    // remove password from userInfo
    const { password, ...userInfo } = payload;

    const accessKey = config.key.access_key;

    const accessToken = await jwtToken(payload, accessKey, "15m");

    await setAccessToken(res, accessToken);

    return userInfo;
  } catch (error) {
    throw error;
  }
};

// protected route service
const protectedRouteService = async (req) => {
  try {
    // take access token and key
    const accessToken = req.cookies.accessToken;
    const accessKey = config.key.access_key;

    if (!accessToken)
      throw createError(403, "Invalid access token, please login again");

    // verify access token
    const decoded = jwt.verify(accessToken, accessKey);

    if (!decoded) throw createError(400, "Something went wrong");
  } catch (error) {
    throw error;
  }
};

module.exports = {
  userLoginService,
  userLogOutService,
  handleRefreshTokenService,
  protectedRouteService,
};
