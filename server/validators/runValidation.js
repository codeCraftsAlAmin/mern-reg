const { validationResult } = require("express-validator");
const { errResponse } = require("../helper/user.helper");

const runValidation = (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return errResponse(res, {
        statusCode: 422,
        message: errors.array()[0].msg, // first convert errors into array
      });
    }
    return next();
  } catch (error) {
    next(error);
  }
};

module.exports = runValidation;
