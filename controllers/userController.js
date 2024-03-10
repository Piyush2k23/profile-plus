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
    const hashedPassword = await hashPassword(password);

    //create new user
    const newUser = await User.create({
      name,
      username,
      email,
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
    const isPasswordValid = await comparePassword(password, user.password);

    if (!isPasswordValid) {
      return res.status(200).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      httpOnly: true,
    });

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

export const test = (req, res) => {
  res.status(200).json({
    success: true,
    message: "Test",
  });
};

export const getUserProfile = async (req, res) => {
  try {
    // Retrieve the user ID from the request object (assuming it's stored in req.user.id)
    const userId = req.user.id;
    // Fetch the user profile from the database
    const userProfile = await User.findById(userId);
    if (!userProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    // Send the user profile as the response
    res.status(200).json({ userProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    // Retrieve the user ID from the request object (assuming it's stored in req.user.id)
    const userId = req.user.id;
    // Retrieve the updated profile data from the request body
    const { name, bio, profilePictureUrl } = req.body;
    // Update the user profile in the database
    const updatedUserProfile = await User.findByIdAndUpdate(
      userId,
      { name, bio, profilePictureUrl },
      { new: true }
    );
    if (!updatedUserProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    // Send the updated user profile as the response
    res.status(200).json({ userProfile: updatedUserProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteUserProfile = async (req, res) => {
  try {
    // Retrieve the user ID from the request object (assuming it's stored in req.user.id)
    const userId = req.user.id;
    // Delete the user profile from the database
    const deletedUserProfile = await User.findByIdAndDelete(userId);
    if (!deletedUserProfile) {
      return res.status(404).json({ error: "User profile not found" });
    }
    // Send a success message as the response
    res.status(200).json({ message: "User profile deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
