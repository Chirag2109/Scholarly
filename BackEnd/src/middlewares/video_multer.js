import multer from 'multer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Define __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set up multer storage with dynamic destination based on username
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        try {
            const uploadDir = path.join(__dirname, '..', 'uploads',  'video');
            fs.mkdirSync(uploadDir, { recursive: true });
            cb(null, uploadDir);
        } catch (error) {
            console.error(error.message);
            cb(error);
        }
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);  // Set the filename as the current timestamp and original name
    }
});

// Configure multer with the storage settings
const upload = multer({ storage }).single('video');  // Assumes the field name is 'video'

export default upload;