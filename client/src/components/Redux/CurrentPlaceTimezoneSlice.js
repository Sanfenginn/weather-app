import { createSlice } from "@reduxjs/toolkit";

const currentPlaceTimezoneSlice = createSlice({
  name: "currentPlaceTimezone",
  initialState: "",
  reducers: {
    setCurrentPlaceTimezone: (state, action) => {
      return action.payload; // 返回新的 state
    },
  },
});

export const { setCurrentPlaceTimezone } = currentPlaceTimezoneSlice.actions;
export default currentPlaceTimezoneSlice.reducer;
