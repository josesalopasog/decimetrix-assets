//Packages ⬇️
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { createServer } from "http";
import { Server as SocketIOServer } from "socket.io";
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
const server = createServer(app); //Wraps app whit Http server for the WebSockets
const io = new SocketIOServer(server, { //Create a SocketIO server
  cors: { 
    origin: allowedOrigins,
    credentials: true  //Allow cookies 
  }
});

app.use(
  cors({
    // Enable CORS for frontend communication
    origin: allowedOrigins, //Origin for frontend requests
    credentials: true, //Allow cookies
  })
);

//Middlewares
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies from request headers

//Routes
app.use("/api/users", userRoutes);
app.use("/api/assets", assetRoutes);

io.on("connection", (socket) => { //Handles SocketIO connection
  console.log("Client connected via WBs") //Confirms in console de connection
  socket.on("disconnect", () => {
    console.log("Client disconnected")
  })
})

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export { io };