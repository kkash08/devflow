import mongoose from "mongoose";

export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database Connection Successful.');
    } catch (error) {
        console.error(error.message);
        console.log('Could not connect to Database')
        process.exit(1); //Exit with failure.
        
    }
} 