import Photos from '../models/profilepic.js';
import path from 'path';

// Add profile picture route with file upload handling
export const addProfilePic = async (req, res) => {
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