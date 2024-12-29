import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    url: { type: String, required: true },
    description: { type: String },
    createdAt: { type: Date, default: Date.now },
});

const Video = mongoose.model('Video', videoSchema);

Video.addvideo = async (req, res) => {
    try {
        const { title, url, description } = req.body;
        const username = req.user.username;

        const newVideo = new Video({ username, title, url, description });
        await newVideo.save();

        res.status(201).json({ message: 'Video added successfully.', video: newVideo });
    } catch (error) {
        console.error('Error adding video:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
}

Video.getvideo = async (req, res) => {
    try {
        const username = req.user.username;
        const videos = await Video.find({ username });

        res.status(200).json(videos);
    } catch (error) {
        console.error('Error fetching videos:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
}

export default Video;