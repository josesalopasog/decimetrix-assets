//Packages ⬇️
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
//Config ⬇️
import connectDB from "./config/db.js";
//Routes ⬇️
import userRoutes from "./routes/userRoutes.js";
import assetRoutes from "./routes/assetRoutes.js";

dotenv.config(); //Loading de environment variables from .env
connectDB(); //Connecting de DB of Mongo
const allowedOrigins = [
  "http://localhost:5173", //For development
  "https://decimetrix-assets.netlify.app", // For production
];

const port = process.env.PORT || 5000; // Uses the environment-defined port or defaults to 5000
const app = express(); // Creates an instance of an Express application

app.use(
  cors({
    // Enable CORS for frontend communication
    origin: allowedOrigins, //Origin for frontend requests
    credentials: true,
  })
);

//Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies from request headers

app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Starts the server and logs the active port
});
