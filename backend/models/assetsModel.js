import mongoose from "mongoose";

const assetSchema = new mongoose.Schema( //Creating the Assets schema for the DB with Mongoose
  {
    name: { type: String, required: true },
    description: { type: String },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    type: { type: String, enum: ["pozo", "motor", "transformador"], required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  },
  { timestamps: true } //Timestamps for when the user was created and updated
);

const Asset = mongoose.model('Asset', assetSchema); //Create a model with the schema

export default Asset; 

//CreateBy explication: 
// type: mongoose.Schema.Types.ObjectId
// Defines the "createdBy" field as an ObjectId, which is used in MongoDB to reference documents in other collections.

// ref: "User"
// Establishes a reference to the "User" collection.
// This allows each asset to store the ID of the user who created it, linking assets to users.

// required: true
// Ensures that every asset must have a registered user, making the field mandatory.