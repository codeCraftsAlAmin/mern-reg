require("dotenv").config();

const dev = {
  app: {
    port: process.env.PORT || 3000,
  },
  db: {
    url: process.env.DB_URL || "mongoDb://localhost:27017/mernReg",
  },
  defImg: {
    img: process.env.DEF_IMG || "",
  },
  cloudinary: {
    cloud_name: process.env.CLOUD_NAME || "",
    api_key: process.env.API_KEY || "",
    api_secret: process.env.API_SECRET || "",
  },
  smtp: {
    smtp_name: process.env.SMTP_USER || "",
    smtp_pass: process.env.SMTP_PASS || "",
  },
  secret_key: {
    forget_pass_key: process.env.FORGET_PASS_KEY || "",
  },
  client: {
    url: process.env.CLIENT_URL || "http://localhost:5173",
  },
  key: {
    access_key: process.env.ACCESS_KEY || "",
    refresh_key: process.env.REFRESH_KEY || "",
  },
};

module.exports = dev;
