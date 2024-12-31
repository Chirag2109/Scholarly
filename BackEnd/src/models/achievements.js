import mongoose from 'mongoose';

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

export default Achievement;