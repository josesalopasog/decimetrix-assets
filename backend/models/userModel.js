import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    password: { type: String, required: true }, 
    role: { type: String, enum: ["admin", "operario"], default: "operario" },
}, { timestamps: true }); //Timestamps for when the user was created and updated

const User = mongoose.model('User', userSchema); //Create a model with the schema

export default User; 
