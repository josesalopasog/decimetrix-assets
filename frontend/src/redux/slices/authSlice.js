//Packages ⬇️
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios"; //For http requests

// Async action for login users
const loginUser = createAsyncThunk(
  "auth/loginUser", //Action name
  async (credentials, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/users/login",
        credentials
      ); // Send credentials to backend
      return response.data; // Return the response (includes the token)
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data); // Handle errors
    }
  }
);

// Async action for logout users
const logoutUser = createAsyncThunk("auth/logoutUser", async (_, thunkAPI) => {
  try {
    await axios.post("http://localhost:5000/api/users/logout"); // Call backend to log out
    return null; // Return null to clear Redux state
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data); // Handle errors
  }
});

// Initial authentication state
const initialState = {
  user: null, // Authenticated user data
  token: null, // Session token
  loading: false, // Loading state
  error: null, // Error handling
};

// Create authentication slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {}, //Empty object · for sync actions
  //Using extraReducers for async actions
  extraReducers: (builder) => { 
    //Async cases ⬇️:
    builder
      //Case where the request is loading (pending)
      .addCase(loginUser.pending, (state) => {
        state.loading = true; //Set loading state to true
        state.error = null; //Set error stat to false because is loading
      })
      //Case where the request was succeed (fulfilled)
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false; //Set loading state to false
        state.user = action.payload.user; //Set the user state with the received payload data of the user
        state.token = action.payload.token; //Set the token state with the received payload data of the token
      })
      //Case where the request failed (rejected)
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false; //Set loading state to false (stop loading)
        state.error = action.payload; //Set the error state with the received payload error
      })
      //Case for logout the user 
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null; 
        state.token = null;
      });
  },
});

export default authSlice.reducer;
export { 
    loginUser, 
    logoutUser 
};
