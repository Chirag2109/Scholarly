import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Notes Schema
const noteSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    notes: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const Notes = mongoose.model('Notes', noteSchema);

// Add video route with file upload handling
Notes.addnote = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded.' });
    }

    try {
        const { title, description, username } = req.body;
        const url = path.join('/uploads', 'notes', req.file.filename);

        const newNotes = new Notes({ username, title, description, notes: url });
        await newNotes.save();

        res.status(201).json({ message: 'Notes added successfully.', notes: newNotes });
    } catch (error) {
        console.error('Error adding notes:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

// Get video for the user
Notes.getnote = async (req, res) => {
    // const { username, filename } = req.params;
    // const videoPath = path.join(__dirname, '..', 'uploads', username, 'video', filename);  // Adjusted path

    // if (fs.existsSync(videoPath)) {
    //     res.sendFile(videoPath);  // Send video file to the client
    // } else {
    //     res.status(404).json({ message: 'Notes not found.' });
    // }
};

// Export the model for use in other parts of the application
export default Notes;