import { createSlice } from "@reduxjs/toolkit";

const hasInitialDataLoadedToSetTimezoneSlice = createSlice({
  name: "hasInitialDataLoadedToSetTimezone",
  initialState: false,
  reducers: {
    setHasInitialDataLoadedToSetTimezone: (state, action) => {
      return action.payload;
    },
  },
});

export const { setHasInitialDataLoadedToSetTimezone } =
  hasInitialDataLoadedToSetTimezoneSlice.actions;
export default hasInitialDataLoadedToSetTimezoneSlice.reducer;
