const User = require("../models/user.model");
const dummyData = require("../data");

const seedUser = async (req, res, next) => {
  try {
    // delete all prev data
    await User.deleteMany({});

    // create new data
    const dummyUsers = await User.insertMany(dummyData.users);

    return res.status(200).send({
      message: "Dummy data has created",
      dummyUsers,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = seedUser;
