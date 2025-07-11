import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`connected to mongodb ${conn}`);
    } catch (error) { 
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};
