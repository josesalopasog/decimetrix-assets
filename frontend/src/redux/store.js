//Packages ⬇️
import { configureStore } from "@reduxjs/toolkit";
//Slices ⬇️
import authReducer from './slices/authSlice';
import uiReducer from './slices/uiSlice';

const store = configureStore({
// Create Redux store for auth and assets reducer
    reducer: {
        auth: authReducer, //Authentication state
        ui: uiReducer, //UI state
    }
});

export default store;