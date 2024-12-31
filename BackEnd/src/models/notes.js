import mongoose from 'mongoose';

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

export default Notes;