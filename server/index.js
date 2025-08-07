const app = require("./app");
const config = require("./config/config");
const connectDb = require("./config/db");

const PORT = config.app.port;

app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDb();
});
