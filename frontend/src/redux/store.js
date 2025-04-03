//Packages ⬇️
import { configureStore } from "@reduxjs/toolkit";
//Slices ⬇️
import authReducer from './slices/authSlice';

const store = configureStore({
// Create Redux store for auth and assets reducer
    reducer: {
        auth: authReducer, //Authentication state
    }
});

export default store;