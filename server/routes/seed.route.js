const express = require("express");
const seed = express.Router();

const seedUser = require("../controllers/seed.controller");

// seed users
seed.get("/seed", seedUser);

module.exports = seed;
