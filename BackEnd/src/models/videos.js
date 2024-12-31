import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Video Schema
const videoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    video: { type: String, required: true }, // Path to the uploaded video file
    createdAt: { type: Date, default: Date.now },
});

// Model
const Video = mongoose.model('Video', videoSchema);

// Add Video route with file upload handling
Video.addvideo = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const { title, description, username } = req.body;
        const url = path.join('/uploads', 'video', req.file.filename);

        const newVideo = new Video({ username, title, description, video: url });
        await newVideo.save();

        res.status(201).json({ message: 'Video added successfully.', video: newVideo });
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

// Get videos for a specific user
Video.getvideos = async (req, res) => {
    try {
        const { username } = req.params; // Assuming username is passed as a URL parameter

        // Find all videos for the given username
        const videos = await Video.find({ username });

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found for this user.' });
        }

        res.status(200).json({
            message: 'Videos retrieved successfully.',
            videos,
        });
    } catch (error) {
        console.error('Error in retrieving videos:', error);
        res.status(500).json({ message: 'Failed to retrieve videos.' });
    }
};

Video.getAllVideos = async (req, res) => {
    try {
        // Find all videos for the given username
        const videos = await Video.find();

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found for this user.' });
        }

        res.status(200).json({
            message: 'Videos retrieved successfully.',
            videos,
        });
    } catch (error) {
        console.error('Error in retrieving videos:', error);
        res.status(500).json({ message: 'Failed to retrieve videos.' });
    }
};

// Get specific video for the user
Video.getvideo = async (req, res) => {
    const { username, filename } = req.params;
    const videoPath = path.join(__dirname, '..', 'uploads', 'video', filename);  // Adjusted path

    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);  // Send video file to the client
    } else {
        res.status(404).json({ message: 'Video not found.' });
    }
};

// Export the model for use in other parts of the application
export default Video;