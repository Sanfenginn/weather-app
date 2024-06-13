import { createSlice } from "@reduxjs/toolkit";

const searchedLocationSlice = createSlice({
  name: "searchedLocation",
  initialState: {
    searchedLocation: [],
  },
  reducers: {
    setSearchedLocation: (state, action) => {
      state.searchedLocation = action.payload;
    },
  },
});

export const { setSearchedLocation } = searchedLocationSlice.actions;
export default searchedLocationSlice.reducer;
