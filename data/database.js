import mongoose from 'mongoose';


export const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "backendapi",
    })
    .then((c) => {console.log(`Connected to ${c.connection.host}`);})
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
    });
}