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
    openSideMenu: (state) => {
      state.isSideMenuOpen = true;
    },
  },
});

export const { toggleSideMenu, closeSideMenu, openSideMenu } = uiSlice.actions;
export default uiSlice.reducer;
