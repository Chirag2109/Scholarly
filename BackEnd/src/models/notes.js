import mongoose from 'mongoose';

const noteSchema = new mongoose.Schema({
    username: { type: String, required: true },
    title: { type: String, required: true },
    fileName: { type: String },
    fileType: { type: String },
    fileData: { type: Buffer },
    createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

Note.addnotes = async (req, res) => {
    try {
        const { title } = req.body;
        const username = req.user.username;
        let fileData = null;

        if (req.file) {
            fileData = {
                fileName: req.file.originalname,
                fileType: req.file.mimetype,
                fileData: req.file.buffer,
            };
        }

        const newNote = new Note({
            username,
            title,
            ...fileData,
        });

        await newNote.save();
        res.status(201).json({ message: 'Note added successfully.', note: newNote });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

Note.getnotes = async (req, res) => {
    try {
        const username = req.user.username;
        const notes = await Note.find({ username });

        res.status(200).json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'An error occurred. Please try again.' });
    }
};

export default Note;