import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideMenuOpen: true,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSideMenu: (state) => {
      state.isSideMenuOpen = !state.isSideMenuOpen;
    },
    closeSideMenu: (state) => {
      state.isSideMenuOpen = false;
    },
  },
});

export const { toggleSideMenu, closeSideMenu } = uiSlice.actions;
export default uiSlice.reducer;
