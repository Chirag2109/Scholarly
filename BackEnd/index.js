import express from "express";
import userRoute from "./routes/user.js";
import "./config/dbconnection.js";

const app = express();
const port = "3000";

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

app.use("/", express.static("./../frontend/dist"))

// Routing middleware
app.use("/user", userRoute);
app.listen(8081, () => {
  console.log('Server is running on port http://localhost:8081');
})