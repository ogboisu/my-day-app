const mongoose = require("mongoose");

// Define the User schema
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },

    // User's email address - must be unique for login
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    // Hashed password will be stored here
    password: {
      type: String,
      required: [true, "Password is required"],
    },
  },
  {
    // Automatically adds createdAt and updatedAt
    timestamps: true,
  }
);

// Export the model
module.exports = mongoose.model("User", userSchema);
