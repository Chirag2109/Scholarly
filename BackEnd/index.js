import express from 'express';
import dotenv from 'dotenv';
import authenticateToken from './src/utils/helper';
import userRouter from './src/routes/users';

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(express.json());
app.use("/user", userRouter);
app.use("*", (req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Start the Server
const PORT = process.env.PORT || 8000;
app.get("/", (req, res) => {
  res.send("hello world again");
});

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

app.listen(PORT, () => {
  console.log("The server is running on port: ", PORT);
});