import express from "express";
import cors from "cors";

import cookieParser from "cookie-parser";
const app = express();
const port = 3000;

app.use(
  cors({
    origin: "http://127.0.0.1:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

import "./Connection/conn.js";

import AuthRoutes from "./Routes/user.routes.js";
import VideoRoutes from "./Routes/video.routes.js";
import CommentRoutes from "./Routes/comment.routes.js";

app.use("/auth", AuthRoutes);
app.use("/api", VideoRoutes);
app.use("/commentApi", CommentRoutes);

app.listen(port, () => {
  console.log(`App is running on ${port}`);
});