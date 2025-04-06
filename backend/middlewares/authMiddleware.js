import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

// const authenticate = asyncHandler(async (req, res, next) => {
//     let token = req.cookies.jwt; // Get the JWT from the cookie

//     if (!token) { // If the token does not exist
//         return res.status(401).json({ message: 'Not authorized, no token' }); // Set the status code to 401 (Unauthorized)
//     }

//     try { // Try to verify the token
//         const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
//         req.user = await User.findById(decoded.id).select('-password'); // Get user without password
//         next(); // Continue to the next middleware
//     } catch (error) {
//         return res.status(401).json({ message: 'Not authorized, token failed' });
//     }
// });

const authenticate = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
});

const isAdmin = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Not authorized as an admin" });
  }
  next();
};

export { authenticate, isAdmin };
