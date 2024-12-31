import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Video Schema
const videoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    video: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

// Add video route with file upload handling
Video.addvideo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const { title, description, username } = req.body;
        const url = path.join('/uploads', username, 'video', req.file.filename);

        const newVideo = new Video({ username, title, description, video: url });
        await newVideo.save();

        res.status(201).json({ message: 'Video added successfully.', video: newVideo });
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

// Get video for the user
Video.getvideo = async (req, res) => {
    const { username, filename } = req.params;
    const videoPath = path.join(__dirname, '..', 'uploads', username, 'video', filename);  // Adjusted path

    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);  // Send video file to the client
    } else {
        res.status(404).json({ message: 'Video not found.' });
    }
};

// Export the model for use in other parts of the application
export default Video;