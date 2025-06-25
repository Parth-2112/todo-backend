import express from 'express';
import {config} from 'dotenv';
// import mongoose from 'mongoose';
import userRouter from './routes/user.js'; // Assuming you have a user router defined in routes/user.js
import taskRouter from './routes/task.js'; // Assuming you have a task router defined in routes/task.js
import cookieParser from 'cookie-parser';
import { errorMiddleware } from './middlewares/error.js';
import cors from 'cors';

config({
    path: './data/config.env'
})

const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:5173' // Add your development URL
];
  
const corsOptions = {
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g., mobile apps, Postman)
      if (!origin) return callback(null, true);
  
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Required if using cookies/auth headers
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  };
  
export const app = express();
app.use(express.json());// middleware to parse JSON request bodies
app.use(cookieParser()); // middleware to parse cookies
app.use(cors(corsOptions));
app.use( "/api/v1/users",userRouter);
app.use("/api/v1/task", taskRouter); // Registering the task router

app.get('/', (req, res) => {
    res.send('Hello, World!');
    // console.log(process.env.FRONTEND_URL);
});

app.use(errorMiddleware);


