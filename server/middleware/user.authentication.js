const createError = require("http-errors");
const config = require("../config/config");
const jwt = require("jsonwebtoken");

// check is login
const isLoggedIn = async (req, res, next) => {
  try {
    // get access token
    const token = req.cookies.accessToken;

    // check if token exists
    if (!token)
      throw createError(401, "Access token not found, please log in first");

    // verify token
    const accessKey = config.key.access_key;

    const decoded = jwt.verify(token, accessKey);

    if (!decoded) throw createError(403, "Invalid token");

    req.user = decoded.user ? decoded.user : decoded; // user it when need to access user info
    // console.log(req.user);

    next();
  } catch (error) {
    next(error);
  }
};

// check is log out
const isLoggedOut = async (req, res, next) => {
  try {
    // get access token
    const token = req.cookies.accessToken;

    if (token) {
      try {
        const accessKey = config.key.access_key;
        const decoded = jwt.verify(token, accessKey);

        if (decoded)
          throw createError(
            404,
            "You are already logged in. Please log out to create a new account."
          );
      } catch (error) {
        throw error;
      }
    }

    next();
  } catch (error) {
    next(error);
  }
};

// check is admin
const isAdmin = async (req, res, next) => {
  try {
    if (!req.user.isAdmin)
      throw createError(
        403,
        "Forbidden, you must be the admin to access this resource"
      );

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = { isLoggedIn, isLoggedOut, isAdmin };
