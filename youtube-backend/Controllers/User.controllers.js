import User from "../Models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const cookieOption = {
  httpOnly: true,
  secure: false,
  sameSite: "Lax",
};
//for signup

export const signup = async (req, res) => {
  try {
    const { channelName, userName, password, about, profilePic } = req.body;

    const existingUser = await User.findOne({ userName });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // for crete new user

    const newUser = new User({
      channelName,
      userName,
      password: hashedPassword,
      about,
      profilePic,
    });

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", success: "yes" });
  } catch (error) {
    res.status(500).json({ error: "Server erroooor" });
  }
};

//for login 
export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, "My_Secret_Key", {
      expiresIn: "1d",
    });
    res.cookie("token", token, cookieOption);

    res.status(200).json({ message: "Login successful", token, user });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("token", cookieOption)
    .json({ message: "Logged out successfully" });
};
