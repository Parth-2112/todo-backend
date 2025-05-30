import mongoose from 'mongoose';


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi",
    })
    .then(() => {console.log('Connected to MongoDB');})
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}