import { createSlice } from "@reduxjs/toolkit";

const hotCitySlice = createSlice({
  name: "hotCities",
  initialState: {
    hotCities: {},
  },
  reducers: {
    setHotCities: (state, action) => {
      state.hotCities = action.payload;
    },
    addHotCities: (state, action) => {
      const { index, cityData } = action.payload;
      if (Array.isArray(cityData) && typeof index === "string") {
        state.hotCities[index] = cityData;
      } else {
        console.error(
          "Invalid payload structure for addHotCities:",
          action.payload
        );
      }
    },
    removeHotCities: (state, action) => {
      delete state.hotCities[action.payload]; // action.payload 是序号
    },
  },
});

export const { setHotCities, addHotCities, removeHotCities } =
  hotCitySlice.actions;
export default hotCitySlice.reducer;
