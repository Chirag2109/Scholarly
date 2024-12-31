import Video from '../models/videos.js';
import path from 'path';
import fs from 'fs';

// Add video
export const addVideo = async (req, res) => {
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
export const getVideosByUser = async (req, res) => {
    try {
        const { username } = req.params;

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

// Get all videos
export const getAllVideos = async (req, res) => {
    try {
        const videos = await Video.find();

        if (videos.length === 0) {
            return res.status(404).json({ message: 'No videos found.' });
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

// Get specific video by filename
export const getVideoByFilename = async (req, res) => {
    const { filename } = req.params;
    const videoPath = path.join(__dirname, '..', 'uploads', 'video', filename);

    if (fs.existsSync(videoPath)) {
        res.sendFile(videoPath);
    } else {
        res.status(404).json({ message: 'Video not found.' });
    }
};