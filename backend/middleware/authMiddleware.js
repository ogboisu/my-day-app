// backend/middleware/authMiddleware.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect private routes
const protect = async (req, res, next) => {
  try {
    let token;

    // ✅ Check Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];

      // ✅ Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // ✅ Fetch user from DB (IMPORTANT)
      const user = await User.findById(decoded.id).select("-password");

      if (!user) {
        return res.status(401).json({
          message: "Not authorized, user no longer exists",
        });
      }

      // ✅ Attach full user to request
      req.user = user;

      return next();
    }

    // ❌ No token provided
    return res.status(401).json({
      message: "Not authorized, no token provided",
    });
  } catch (error) {
    // ✅ Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token expired, please login again",
      });
    }

    return res.status(401).json({
      message: "Not authorized, token invalid",
    });
  }
};

module.exports = protect;