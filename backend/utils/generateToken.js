const jwt = require("jsonwebtoken");

// Generate a JWT token for an authenticated user
const generateToken = (id) => {
  return jwt.sign(
    { id }, // payload
    process.env.JWT_SECRET, // secret key
    { expiresIn: "7d" } // token lifetime
  );
};

module.exports = generateToken;
