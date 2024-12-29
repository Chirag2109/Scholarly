import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const User = mongoose.model('User', userSchema);

User.adduser = async (req, res) => {
    try {
        const { username, email, password, userType } = req.body;

        // Basic Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'All fields are required.' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(409).json({ message: 'Username or Email already exists.' });
        }

        // Password validation
        if (password.length < 8 || !/\d/.test(password) || !/[A-Z]/.test(password)) {
            return res.status(400).json({ message: 'Password must be at least 8 characters long, include one number, and one uppercase letter.' });
        }

        // Hash the password and save the user
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword, userType });
        await newUser.save();

        // Generate a JWT token for the newly registered user
        const token = jwt.sign(
            { id: newUser._id, email: newUser.email, username: newUser.username },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'User registered successfully.',
            token, // Send the token along with the response
        });
    } catch (error) {
        console.error('Error during user signup:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
}

User.getuser = async (req, res) => {
    try {
        const { email } = req.params;
        const user = await User.findOne({ email }, { password: 0 });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
}

User.signin = async (req, res) => {
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
      { id: newUser._id, email: newUser.email, username: newUser.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );    

    res.status(200).json({ message: 'Sign in successful.', token });
  } catch (error) {
    console.error('Error during user sign-in:', error);
    res.status(500).json({ message: 'An error occurred. Please try again.' });
  }
}

export default User;