const jwt = require("jsonwebtoken");

// const jwtToken = async (payload, privateKey, expiresIn) => {
//   const token = jwt.sign(payload, privateKey, { expiresIn });
//   return token;
// };

const jwtToken = async (payload, privateKey, expiresIn) => {
  // typeof means if this type doesn't match
  if (typeof payload !== "object" || !payload) {
    throw new Error("Payload must be a non-empty object");
  }

  if (typeof privateKey !== "string" || privateKey === "") {
    throw new Error("PrivateKey must be a non-empty string");
  }

  try {
    const token = jwt.sign(payload, privateKey, { expiresIn });
    return token;
  } catch (error) {
    console.Error("Failed to sign the JWT:", error);
    throw error;
  }
};

module.exports = jwtToken;
