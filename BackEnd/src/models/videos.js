import mongoose from 'mongoose';

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

export default Video;