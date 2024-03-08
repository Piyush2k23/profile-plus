import User from "../models/userModel.js";
import asyncHandler from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import { comparePassword, hashPassword } from "../utils/passwordHashing.js";

// Register User => /api/v1/register
export const register = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return next(
      new ErrorHandler("Please enter all the details for registration"),
      400
    );
  }

  const user = await User.findOne({ email });

  if (user) {
    return next(new ErrorHandler("User already register with this email"), 409);
  }

  const hashedPassword = hashPassword(password);

  const newUser = await User.create({
    name,
    username,
    email,
    password: hashedPassword,
  });

  await newUser.save();
});

// Login User => /api/v1/login
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter a email and password"), 400);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorHandler("Invalid email and password"), 401);
  }

  const isPasswordValid = comparePassword(password, user.password);

  if (!isPasswordValid) {
    return next(new ErrorHandler("Invalid password"), 401);
  }
});

//Logout user => /api/v1/logout
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
});
