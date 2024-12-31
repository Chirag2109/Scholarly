import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Notes Schema
const photoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    photos: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

const Photos = mongoose.model('Photos', photoSchema);

// Add video route with file upload handling
Photos.addprofilepic = async (req, res) => {
    if (!req.file) {
        return res.send({ message: 'No file uploaded.', ok: false });
    }

    try {
        const { username } = req.body;
        const url = path.join('/uploads', 'profilepic', req.file.filename);

        const newDp = new Photos({ username, photos: url });
        await newDp.save();

        res.status(201).json({ message: 'New DP added successfully.', photos: newDp });
    } catch (error) {
        console.error('Error adding profile pic:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

// Get video for the user
// Notes.getnote = async (req, res) => {
    // const { username, filename } = req.params;
    // const videoPath = path.join(__dirname, '..', 'uploads', username, 'video', filename);  // Adjusted path

    // if (fs.existsSync(videoPath)) {
    //     res.sendFile(videoPath);  // Send video file to the client
    // } else {
    //     res.status(404).json({ message: 'Notes not found.' });
    // }
// };

// Export the model for use in other parts of the application
export default Photos;