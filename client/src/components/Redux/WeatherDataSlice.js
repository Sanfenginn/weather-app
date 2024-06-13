import { createSlice } from "@reduxjs/toolkit";

const WeatherDataSlice = createSlice({
  name: "weatherData",
  initialState: {
    weatherData: {},
  },
  reducers: {
    setWeatherDataFromRedux: (state, action) => {
      state.weatherData = action.payload;
    },
  },
});

export const { setWeatherDataFromRedux } = WeatherDataSlice.actions;
export default WeatherDataSlice.reducer;
