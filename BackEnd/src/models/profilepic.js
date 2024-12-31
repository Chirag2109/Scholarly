import mongoose from 'mongoose';

// Photo Schema
const photoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    photos: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

// Model
const Photos = mongoose.model('Photos', photoSchema);

export default Photos;