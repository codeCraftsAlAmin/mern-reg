const createError = require("http-errors");
const emailWithNodemailer = require("./user.email");

const setEmailData = async (emailData) => {
  try {
    await emailWithNodemailer(emailData);
  } catch (emailData) {
    throw createError(500, "Failed to send verification email");
  }
};

module.exports = setEmailData;
