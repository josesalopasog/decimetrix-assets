import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import connectDB from './config/db';

dotenv.config(); //Loading de environment variables from .env
connectDB(); //Connecting de DB of Mongo 

const port = process.env.PORT || 5000; // Uses the environment-defined port or defaults to 5000
const app = express(); // Creates an instance of an Express application

//Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies from request headers

app.listen(port, () => { 
    console.log(`Server is running on port ${port}`); // Starts the server and logs the active port
});