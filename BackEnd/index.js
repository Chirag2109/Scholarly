import express from "express";
import userRoute from "./src/routes/user.js";
import "./src/config/dbconnection.js";

const app = express();
const port = "4000";

// Generic Middlewares
app.use(express.json());
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Routing middleware
app.use("/user", userRoute);

app.get("/", (req, res) => {
  res.send("hello world again");
});

app.listen(port, () => {
  console.log("The server is running on port: ", port);
});