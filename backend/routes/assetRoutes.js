import express from "express";
import {
  createAsset,
  getAssets,
  updateAsset,
  deleteAsset,
} from "../controllers/assetController.js";

import { authenticate } from "../middlewares/authMiddleware.js";

const router = express.Router(); //Create new router

router
    .route("/") //Route for /api/assets
    .post(authenticate, createAsset) //Create new assets
    .get(authenticate, getAssets) //Get all the assets
router
    .route("/:id")
    .put(authenticate, updateAsset) //Update asset by ID
    .delete(authenticate, deleteAsset) //Delete asset by ID 

export default router;