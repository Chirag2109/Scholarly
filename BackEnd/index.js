import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

const connectDb = async () => {
  await mongoose.connect(`${process.env.DB_CONNECTION}`)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(err => console.error('Failed to connect to MongoDB:', err));
};

try {
  connectDb();
} catch (error) {
  console.error('Error connecting to MongoDB:', error);
}

// User Schema and Model
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', userSchema);

// Signup Route
app.post('/user/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Basic Validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(409).json({ message: 'Username or Email already exists.' });
    }

    // Hash the password and save the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Sign-In Route
app.post('/user/signin', async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;

    // Basic Validation
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ message: 'Username/Email and password are required.' });
    }

    // Check if the input is an email or username
    const isEmail = usernameOrEmail.includes('@');
    const query = isEmail ? { email: usernameOrEmail } : { username: usernameOrEmail };

    // Find the user by email or username
    const user = await User.findOne(query);
    if (!user) {
      return res.status(404).json({ message: 'User not found. Please sign up first.' });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(200).json({ message: 'Sign in successful.', token });
  } catch (error) {
    console.error('Error during user sign-in:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
});

// Start the Server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));