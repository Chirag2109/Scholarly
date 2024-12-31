import express from 'express';
import cors from 'cors';
import authenticateToken from './src/utils/helper.js';
import userRouter from './src/routes/users.js';
import notesRouter from './src/routes/notes.js';
import videoRouter from './src/routes/videos.js';
import './src/config/dbconnection.js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded( { extended: true } ));
app.use("/user", userRouter);
app.use("/notes", notesRouter);
app.use("/videos", videoRouter);
// app.use(cors({
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
// app.use("*", (req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "*");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, DELETE, OPTIONS"
//   );
//   next();
// });

app.get('/protected', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the protected route!', user: req.user });
});

// Start the Server
const PORT = process.env.PORT;
app.get("/", (req, res) => {
  res.send("hello world!");
});

app.listen(PORT, () => {
  console.log("The server is running on port: ", PORT);
});