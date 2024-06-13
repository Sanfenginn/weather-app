import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import hotCityReducer from "./HotCitySlice";
import locationReducer from "./LocationSlice";
import isFreshReducer from "./isFreshSlice";
import searchedLocationReducer from "./SearchedLocationSlice";
import currentLocationReducer from "./CurrentLoationSlice";
import weatherDataReducer from "./WeatherDataSlice";
import fourHotCitiesWeatherDataReducer from "./FourHotCitiesWeatherDataSlice";
import currentPlaceTimezoneReducer from "./CurrentPlaceTimezoneSlice";
import hasInitialDataLoadedToSetTimezoneReducer from "./hasInitialDataLoadedToSetTimezoneSlice";
import { thunk } from "redux-thunk"; // 导入命名导出 thunk
// import thunk from "redux-thunk";

// 为每个需要持久化的 reducer 定义单独的持久化配置
const fourHotCitiesWeatherDataPersistConfig = {
  key: "fourHotCitiesWeatherData",
  storage,
};

const hotCityPersistConfig = {
  key: "hotCities",
  storage,
};

const currentLocationPersistConfig = {
  key: "currentLocation",
  storage,
};

const persistedFourHotCitiesWeatherDataReducer = persistReducer(
  fourHotCitiesWeatherDataPersistConfig,
  fourHotCitiesWeatherDataReducer
);
const persistedHotCityReducer = persistReducer(
  hotCityPersistConfig,
  hotCityReducer
);

const persistedCurrentLocationReducer = persistReducer(
  currentLocationPersistConfig,
  currentLocationReducer
);

// 配置 store
const store = configureStore({
  reducer: {
    hotCities: persistedHotCityReducer,
    location: locationReducer,
    isFresh: isFreshReducer,
    searchedLocation: searchedLocationReducer,
    currentLocation: persistedCurrentLocationReducer,
    weatherData: weatherDataReducer,
    fourHotCitiesWeatherData: persistedFourHotCitiesWeatherDataReducer,
    currentPlaceTimezone: currentPlaceTimezoneReducer,
    hasInitialDataLoadedToSetTimezone: hasInitialDataLoadedToSetTimezoneReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
        ignoredPaths: ["somePath.register"],
      },
    }).concat(thunk),
});

const persistor = persistStore(store);

export { store, persistor };
