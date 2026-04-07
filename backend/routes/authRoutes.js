// backend/routes/authRoutes.js

const express = require("express");
const { body } = require("express-validator");

const {
  signupUser,
  loginUser,
  getMe,
} = require("../controllers/authController");

const protect = require("../middleware/authMiddleware");
const validateRequest = require("../middleware/validateRequest"); // ✅ new middleware

const router = express.Router();

/*
|--------------------------------------------------------------------------
| AUTH ROUTES
|--------------------------------------------------------------------------
| These routes handle user authentication (signup, login, profile)
|--------------------------------------------------------------------------
*/

// ✅ Signup Route (with validation)
router.post(
  "/signup",
  [
    body("name")
      .trim()
      .notEmpty()
      .withMessage("Name is required"),

    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
  ],
  validateRequest,
  signupUser
);

// ✅ Login Route (with validation)
router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please provide a valid email"),

    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required"),
  ],
  validateRequest,
  loginUser
);

// ✅ Get current user (Protected)
router.get("/me", protect, getMe);

module.exports = router;