import jwt from "jsonwebtoken";

//Protected routed token base
export const requireSignIn = async (req, res, next) => {
   try {
    const decode = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);
    next();
   } catch (error) {
      res.status(401).json({ message: "Unauthorized", error });
   }
};