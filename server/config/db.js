const mongoose = require("mongoose");
const config = require("./config");
const dbUrl = config.db.url;

// option is for get multiple values, for now its initial value is an empty string

const connectDb = async (option = {}) => {
  try {
    await mongoose.connect(dbUrl);
    console.log("Db is connected");

    mongoose.connection.on("error", (error) => {
      console.log("Db connection error", error);
    });
  } catch (error) {
    console.log("Db isn't connected", error.toString());
  }
};

module.exports = connectDb;
