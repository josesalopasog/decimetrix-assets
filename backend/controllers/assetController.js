import asyncHandler from "../middlewares/asyncHandler.js";
import Asset from "../models/assetsModel.js";
import { io } from "../server.js"

const createAsset = asyncHandler(async (req, res) => {
  const { name, description, latitude, longitude, type } = req.body;
  if (!name || !description || !latitude || !longitude || !type) {
    //Check if the all the params are provided
    return res.status(400).json({
      message:
        "Please provide a name, a description, the latitude, the longitude and the type for the asset",
    }); //If something is missing set status code 400(Bad Request) and send the response in a json
  }

  const newAsset = await Asset.create({
    //Create new asset
    name,
    description,
    latitude,
    longitude,
    type,
    createdBy: req.user.id,
  });

  try {
    await newAsset.save(); //Save the new asset to the DB
    io.emit("assetCreated", newAsset); // Emit a WS event when a new asset is created
    res
      .status(201)
      .json({ message: "Asset created successfully", asset: newAsset }); //Set the status code to 201 (Created) and send the response
  } catch {
    return res.status(400).json({ message: "Error creating asset" }); //Set the status code to 400 (Bad Request) and send the response
  }
});

const getAssets = asyncHandler(async (req, res) => {
  let assets;
  if (req.user.role === "admin") {
    //Check if the user is admin
    assets = await Asset.find().populate("createdBy", "username email"); //Get all the assets with the creator user information.
  } else {
    //If is an operator
    assets = await Asset.find({ createdBy: req.user.id }).populate(
      "createdBy",
      "username email"
    ); //Get only the assets that the user create.
  }
  return res.status(200).json(assets);
});

const updateAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id); //Get the asset by the id
  if (!asset) return res.status(404).json({ message: "Asset not found" }); //If the asset doesn't exists set the status code to 400 (Bad Request) and send the response

  if (req.user.role !== "admin" && asset.createdBy.toString() !== req.user.id) {
    //Verify if the user is an admin or the creator of the asset
    return res
      .status(403) //Set status 403(Forbidden)
      .json({ message: "Unauthorized to update this asset" }); //Send the response
  }

  const updatedAsset = await Asset.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  }); //Update the asset with the provided data
  io.emit("assetUpdated", updatedAsset); //Emits a WS event when an asset is updated
  res.status(200).json(updatedAsset);
});

const deleteAsset = asyncHandler(async (req, res) => {
  const asset = await Asset.findById(req.params.id); //Get the asset by the id
  if (!asset) return res.status(404).json({ message: "Asset not found" }); //If the asset doesn't exists set the status code to 400 (Bad Request) and send the response

  if (req.user.role !== "admin" && asset.createdBy.toString() !== req.user.id) {
    //Verify if the user is an admin or the creator of the asset
    return res
      .status(403) //Set status 403(Forbidden)
      .json({ message: "Unauthorized to delete this asset" }); //Send the response
  }

  await Asset.findByIdAndDelete(req.params.id);
  io.emit("assetDeleted", asset._id); //Emits a WS event when an asset is updated
  res.status(200).json({ message: "Asset deleted successfully" });
});

export { 
    createAsset, 
    getAssets, 
    updateAsset, 
    deleteAsset };
