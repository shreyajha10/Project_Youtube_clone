import jwt from "jsonwebtoken";
import User from "../Models/user.js";

export const authenticateToken = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "Access denied" });
  } else {
    try {
      const decode = jwt.verify(token, "My_Secret_Key");
      req.user = await User.findById(decode.userId).select("-password");

      next();
    } catch (error) {
      console.log(error.message);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  }
};
