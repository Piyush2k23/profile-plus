import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../helpers/authHelper.js";
import jwt from "jsonwebtoken";

// Register User => /api/v1/register
export const register = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    //validations
    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }
    if (!username) {
      return res.status(400).json({ message: "Username is required" });
    }
    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }
    if (!password) {
      return res.status(400).json({ message: "Password is required" });
    }

    //check user
    const existingUser = await User.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(200).json({
        success: true,
        message: "User already exists, please login",
      });
    }

    //hash password
    const hashedPassword = hashPassword(password);

    //create new user
    const newUser = await User.create({
      name,
      email,
      username,
      password: hashedPassword,
    });

    //save new user in database
    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User register successfully",
      newUser,
    });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, message: "Error in Registration", error });
  }
};

// Login User => /api/v1/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    //validations
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please enter a email and password" });
    }

    //check user
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid email and password",
      });
    }

    //compare password
    const isPasswordValid = comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign({_id:user._id}, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // res.cookie("token", token, {
    //   expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    //   httpOnly: true,
    // }); 

    res.status(200).json({
      success: true,
      message: "Login successfully",
      token,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error in Login",
      error,
    });
  }
};

//Logout user => /api/v1/logout
export const logout = (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out",
  });
};
