import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    username: {
      type: String,
      required: [true, "Please enter your username"],
      minlength: [4, "Your username must be at least 4 characters"],
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Your password must be at least 6 characters"],
    },
    bio: {
      type: String,
    },
    profilePictureUrl: {
      type: String,
    },
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "",
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
