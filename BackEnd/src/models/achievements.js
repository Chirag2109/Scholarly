import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Achievements Schema
const achievementSchema = new mongoose.Schema({
    username: { type: String, required: true },
    headline: { type: String, required: true },
    description: { type: String, required: true },
    certificatePath: { type: String }, // To store the path of the uploaded certificate (optional)
    eventImagesPaths: { type: [String] }, // To store paths of uploaded event images (optional)
    createdAt: { type: Date, default: Date.now },
});

// Model
const Achievement = mongoose.model('Achievement', achievementSchema);

// Add Achievement route with file upload handling
Achievement.addachievement = async (req, res) => {
    try {
        const { headline, description } = req.body;

        // Validation for required fields
        if (!headline || !description) {
            return res.status(400).json({ error: 'Headline and description are required.' });
        }

        // File upload handling for certificate and event images
        const certificateFile = req.files?.['certificate']?.[0]; // Certificate file (PDF)
        const eventImages = req.files?.['eventImage'] || []; // Event images (multiple files)

        const achievement = new Achievement({
            username: req.body.username, // Assuming the username comes from req.body or session
            headline,
            description,
            certificatePath: certificateFile ? certificateFile.path : null,
            eventImagesPaths: eventImages.map((image) => image.path),
        });

        // Save achievement to the database
        await achievement.save();

        res.status(200).json({
            message: 'Achievement uploaded successfully!',
            achievement,
        });
    } catch (error) {
        console.error('Error in uploading achievement:', error);
        res.status(500).json({ error: 'Failed to upload achievement.' });
    }
};

// Get all achievements for a specific username
Achievement.getachievements = async (req, res) => {
    try {
        const { username } = req.params; // Assuming username is passed in the URL

        // Find all achievements for the given username
        const achievements = await Achievement.find({ username });

        if (achievements.length === 0) {
            return res.status(404).json({ message: 'No achievements found for this user.' });
        }

        res.status(200).json({
            message: 'Achievements retrieved successfully.',
            achievements,
        });
    } catch (error) {
        console.error('Error in retrieving achievements:', error);
        res.status(500).json({ error: 'Failed to retrieve achievements.' });
    }
};

// Get all achievements
Achievement.getAllAchievements = async (req, res) => {
    try {
        // Retrieve all achievements
        const achievements = await Achievement.find();

        if (achievements.length === 0) {
            return res.status(404).json({ message: 'No achievements found.' });
        }

        res.status(200).json({
            message: 'All achievements retrieved successfully.',
            achievements,
        });
    } catch (error) {
        console.error('Error in retrieving all achievements:', error);
        res.status(500).json({ error: 'Failed to retrieve all achievements.' });
    }
};

// Export the model
export default Achievement;