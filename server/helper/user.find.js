const createError = require("http-errors");
const mongoose = require("mongoose");

const findUserById = async (Model, id) => {
  try {
    const item = await Model.findById(id);

    if (!item) throw createError(404, `${Model.modelName} not found`);

    return item;
  } catch (error) {
    if (error instanceof mongoose.Error) {
      throw createError(400, "Invalid model name");
    }
    throw error;
  }
};

module.exports = findUserById;
