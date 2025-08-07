const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const createError = require("http-errors");

const seedRouter = require("./routes/seed.route");
const userRouter = require("./routes/user.route");
const loginRouter = require("../server/routes/login.route");
const { errResponse } = require("./helper/user.helper");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "https://mern-reg.vercel.app",
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(helmet());
app.use(morgan("dev"));

// seed router
app.use("/api", seedRouter);

// register user router
app.use("/api", userRouter);

// login user router
app.use("/api", loginRouter);

app.get("/", (req, res) => {
  res.status(200).send("This is your home route");
});

// handle errors
app.use((req, res, next) => {
  next(createError(404, "Router not found"));
});

app.use((err, req, res, next) => {
  return errResponse(res, {
    statusCode: err.status,
    message: err.message,
  });
});

module.exports = app;
