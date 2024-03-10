import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

//Protected routed token base
export const requireSignIn = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      res.status(401).json({ message: "Please login first" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decode._id);

    next();
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
