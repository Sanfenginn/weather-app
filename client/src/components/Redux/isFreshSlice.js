import { createSlice } from "@reduxjs/toolkit";

const isFreshSlice = createSlice({
  name: "isFresh",
  initialState: { isFresh: false },
  reducers: {
    setIsFreshInStore: (state, action) => {
      return action.payload;
    },
  },
});

export const { setIsFreshInStore } = isFreshSlice.actions;
export default isFreshSlice.reducer;
