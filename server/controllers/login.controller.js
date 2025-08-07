const { succResponse } = require("../helper/user.helper");

const {
  userLoginService,
  userLogOutService,
  handleRefreshTokenService,
  protectedRouteService,
} = require("../service/login.service");

// login user controller
const userLogin = async (req, res, next) => {
  try {
    // take email and password
    const { email, password } = req.body;

    // user login service
    const loggedUser = await userLoginService(res, email, password);

    return succResponse(res, {
      statusCode: 200,
      message: "User is logged in successfully",
      payload: { loggedUser },
    });
  } catch (error) {
    next(error);
  }
};

// log-out user controller
const userLogOut = async (req, res, next) => {
  try {
    // user log out service
    await userLogOutService(res);

    return succResponse(res, {
      statusCode: 200,
      message: "User is successfully logged out",
    });
  } catch (error) {
    next(error);
  }
};

// re-generate access token controller
const handleRefreshToken = async (req, res, next) => {
  try {
    // access token service
    const userInfo = await handleRefreshTokenService(req, res);

    return succResponse(res, {
      statusCode: 200,
      message: "Access token has successfully generated",
      payload: { userInfo },
    });
  } catch (error) {
    next(error);
  }
};

// protected route controller
const handleProtectedRoute = async (req, res, next) => {
  try {
    // protected route service
    await protectedRouteService(req);

    return succResponse(res, {
      statusCode: 200,
      message: "Token is correct and route is protected",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  userLogin,
  userLogOut,
  handleRefreshToken,
  handleProtectedRoute,
};
