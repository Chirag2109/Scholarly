import Notes from '../models/notes.js';
import path from 'path';

// Add Notes route with file upload handling
export const addNote = async (req, res) => {
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
export const getNotes = async (req, res) => {
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