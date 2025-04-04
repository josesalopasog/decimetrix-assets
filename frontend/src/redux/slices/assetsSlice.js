import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/axios"; // Axios instance for API calls

// Async action for fetching assets
const fetchAssets = createAsyncThunk(
  "assets/fetchAssets", // Action name
  async () => {
    const response = await api.get("/assets"); // Fetch assets from the API
    return response.data; // Return the assets data
  }
);
// Async action for creating an asset
const createAsset = createAsyncThunk(
  "assets/createAsset", // Action name
  async (newAssetData) => {
    const response = await api.post("/assets", newAssetData); // Create a new asset
    return response.data; // Return the created asset data
  }
);
// Async action for updating an asset
const updateAsset = createAsyncThunk(
  "assets/updateAsset", // Action name
  async ({ id, assetData }) => {
    const response = await api.put(`/assets/${id}`, assetData); // Update an existing asset
    return response.data; // Return the updated asset data
  }
);
// Async action for deleting an asset
const deleteAsset = createAsyncThunk(
  "assets/deleteAsset", // Action name
  async (id) => {
    await api.delete(`/assets/${id}`); // Delete an asset
    return id; // Return the deleted asset ID
  }
);
// Initial state for assets
const initialState = {
  assets: [], // Array to hold assets data
  loading: false, // Loading state
  error: null, // Error state
};
// Create assets slice
const assetsSlice = createSlice({
  name: "assets",
  initialState,
  reducers: {}, // Empty object for sync actions
  extraReducers: (builder) => {
    builder
      .addCase(fetchAssets.pending, (state) => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(fetchAssets.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        state.assets = action.payload; // Set assets data from payload
      })
      .addCase(fetchAssets.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message; // Set error message from action
      })
      .addCase(createAsset.pending, (state) => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(createAsset.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        state.assets.push(action.payload); // Add new asset to the assets array
      })
      .addCase(createAsset.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message; // Set error message from action
      })
      .addCase(updateAsset.pending, (state) => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(updateAsset.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        const index = state.assets.findIndex(
          (asset) => asset.id === action.payload.id
        ); // Find index of updated asset
        if (index !== -1) {
          state.assets[index] = action.payload; // Update asset in the array
        }
      })
      .addCase(updateAsset.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message; // Set error message from action
      })
      .addCase(deleteAsset.pending, (state) => {
        state.loading = true; // Set loading state to true
        state.error = null; // Reset error state
      })
      .addCase(deleteAsset.fulfilled, (state, action) => {
        state.loading = false; // Set loading state to false
        state.assets = state.assets.filter(
          (asset) => asset.id !== action.payload
        ); // Remove deleted asset from the array
      })
      .addCase(deleteAsset.rejected, (state, action) => {
        state.loading = false; // Set loading state to false
        state.error = action.error.message; // Set error message from action
      });
  },
});
export default assetsSlice.reducer; // Export the reducer
export {
    fetchAssets,
    createAsset,
    updateAsset,
    deleteAsset,
}
