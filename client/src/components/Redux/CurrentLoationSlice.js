import { createSlice } from "@reduxjs/toolkit";

const currentLocationSlice = createSlice({
  name: "currentLocation",
  initialState: {
    currentLocation: [],
  },
  reducers: {
    setCurrentLocation: (state, action) => {
      state.currentLocation = action.payload;
    },
  },
});

export const { setCurrentLocation } = currentLocationSlice.actions;
export default currentLocationSlice.reducer;
