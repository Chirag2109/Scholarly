import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDb = async () => {
    await mongoose.connect(`${process.env.DB_CONNECTION}`)
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch(err => console.error('Failed to connect to MongoDB:', err));
};

try {
    connectDb();
} catch (error) {
    console.error('Error connecting to MongoDB:', error);
}