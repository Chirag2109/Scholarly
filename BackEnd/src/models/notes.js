import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';

// Notes Schema
const noteSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String },
    notes: { type: String, required: true }, // Path to the uploaded notes file
    createdAt: { type: Date, default: Date.now },
});

// Model
const Notes = mongoose.model('Notes', noteSchema);

// Add Notes route with file upload handling
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

// Get Notes for a specific user
Notes.getnotes = async (req, res) => {
    try {
        const { username } = req.params; // Assuming username is passed as a URL parameter

        // Find all notes for the given username
        const notes = await Notes.find({ username });

        if (notes.length === 0) {
            return res.status(404).json({ message: 'No notes found for this user.' });
        }

        res.status(200).json({
            message: 'Notes retrieved successfully.',
            notes,
        });
    } catch (error) {
        console.error('Error in retrieving notes:', error);
        res.status(500).json({ message: 'Failed to retrieve notes.' });
    }
};

// Export the model
export default Notes;