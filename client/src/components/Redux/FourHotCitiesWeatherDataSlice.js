import { createSlice } from "@reduxjs/toolkit";

const FourHotCitiesWeatherDataSlice = createSlice({
  name: "fourHotCitiesWeatherData",
  initialState: {
    fourHotCitiesWeatherData: [],
  },
  reducers: {
    setFourHotCitiesWeatherData: (state, action) => {
      state.fourHotCitiesWeatherData = action.payload;
    },
  },
});

export const { setFourHotCitiesWeatherData } =
  FourHotCitiesWeatherDataSlice.actions;
export default FourHotCitiesWeatherDataSlice.reducer;
