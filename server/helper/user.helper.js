// error response
const errResponse = (
  res,
  { statusCode = 500, message = "Internel server error" }
) => {
  return res.status(statusCode).json({
    success: false,
    message,
  });
};

// success response
const succResponse = (
  res,
  { statusCode = 200, message = "Success ", payload = {} }
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    payload,
  });
};

module.exports = { errResponse, succResponse };
