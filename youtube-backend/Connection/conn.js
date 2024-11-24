import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/clone-youtube")
const db = mongoose.connection;
db.on("open", () => {
  console.log("Connection is successfull ho gya.");
});

db.on("error", () => {
  console.log("Connection is not succesful");
});