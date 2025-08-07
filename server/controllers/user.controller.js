const { succResponse } = require("../helper/user.helper");

const {
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
} = require("../service/user.service");

// get all users controller
const getAllUsers = async (req, res, next) => {
  try {
    // search & paginations
    const search = req.query.search || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 5; // how many users will be shown in a page

    // all users service
    const { users, pagination } = await getAllUserService(search, page, limit);

    return succResponse(res, {
      statusCode: 200,
      message: "Success",
      payload: {
        users,
        pagination,
      },
    });
  } catch (error) {
    next(error);
  }
};

// get user by id controller
const getUserById = async (req, res, next) => {
  try {
    // take user id
    const id = req.params.id;

    // find user service
    const user = await findUserService(id);

    return succResponse(res, {
      statusCode: 200,
      message: "Success",
      payload: { user },
    });
  } catch (error) {
    next(error);
  }
};

// delete user by id controller
const deleteUserById = async (req, res, next) => {
  try {
    // find user with id
    const id = req.params.id;
    await findUserService(id);

    // delete service
    await deleteUserService(id);

    return succResponse(res, {
      statusCode: 201,
      message: "User has deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

// registration process controller
const processRegister = async (req, res, next) => {
  try {
    // take user info and image
    const { name, email, password, address, phone } = req.body;

    const image = req.file?.path;

    // register service
    const { verificationExpiresAt } = await registerService(
      name,
      email,
      password,
      address,
      phone,
      image
    );

    return succResponse(res, {
      statusCode: 200,
      message: `A verification code has sent to ${email}, please check your email`,
      payload: { email, verificationExpiresAt },
    });
  } catch (error) {
    next(error);
  }
};

// verify user controller
const verifyUser = async (req, res, next) => {
  try {
    // take email and verificationCode
    const { email, verificationCode } = req.body;

    // verify service
    await verifyService(email, verificationCode);

    return succResponse(res, {
      statusCode: 200,
      message: "User is successfully verified",
    });
  } catch (error) {
    next(error);
  }
};

// resend verification controller
const resendVerification = async (req, res, next) => {
  try {
    // take email from user
    const { email } = req.body;

    const verificationExpiresAt = await resendVerificationService(email);

    return succResponse(res, {
      statusCode: 200,
      message: `A new verification code has sent to your email: ${email}, please check again`,
      payload: { verificationExpiresAt },
    });
  } catch (error) {
    next(error);
  }
};

// update user controller
const updateUserById = async (req, res, next) => {
  try {
    // take user id
    const { id } = req.params;

    // update user service
    const updatedUser = await updateUserService(id, req);

    succResponse(res, {
      statusCode: 200,
      message: "User has updated successfully",
      payload: { updatedUser },
    });
  } catch (error) {
    next(error);
  }
};

// update password controller
const updatePassword = async (req, res, next) => {
  try {
    // check if user exists
    const { id } = req.params;

    // update password service
    await updatePasswordService(id, req);

    return succResponse(res, {
      statusCode: 200,
      message: "User password updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

// forget password controller
const forgetPassword = async (req, res, next) => {
  try {
    // check user if exists or not
    const { email } = req.body;

    // forget password service
    const token = await forgetPassService(email);

    return succResponse(res, {
      statusCode: 200,
      message: "A message has just sent to your email, please check it",
      payload: { token },
    });
  } catch (error) {
    next(error);
  }
};

// reset password controller
const resetPassword = async (req, res, next) => {
  try {
    // take token and new password from req.body
    const { token, password } = req.body;

    // reset password service
    await resetPasswordService(token, password);

    return succResponse(res, {
      statusCode: 200,
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

// user action controller
const handleUserActionById = async (req, res, next) => {
  try {
    // take user id
    const { id } = req.params;
    const { action } = req.body;

    // user action service
    const successMessage = await userActionService(id, action);

    return succResponse(res, {
      statusCode: 200,
      message: "Success",
      payload: { successMessage },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
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
};
