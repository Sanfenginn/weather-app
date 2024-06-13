import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setWeatherDataFromRedux } from "../Redux/WeatherDataSlice";
import _, { set } from "lodash";
import { setFourHotCitiesWeatherData } from "../Redux/FourHotCitiesWeatherDataSlice";
import { setLocation } from "../Redux/LocationSlice";
import formatDate from "./formatDate";

const useGetWeatherData = (locations) => {
  const dispatch = useDispatch();
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isTimerUpdated, setIsTimerUpdated] = useState(false);
  const searchedLocationFromRedux = useSelector(
    (state) => state.searchedLocation.searchedLocation
  );
  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  const [hasInitialDataLoaded, setHasInitialDataLoaded] = useState(false);

  useEffect(() => {
    if (!hasInitialDataLoaded) {
      setLatitude(currentLocationFromRedux[0]);
      setLongitude(currentLocationFromRedux[1]);
      setHasInitialDataLoaded(true); // 标记数据已加载
      console.log("根据当前位置更新经纬度");
    }
  }, [searchedLocationFromRedux, currentLocationFromRedux]); // 依赖于初始位置

  useEffect(() => {
    if (hasInitialDataLoaded) {
      setLatitude(searchedLocationFromRedux[0]);
      setLongitude(searchedLocationFromRedux[1]);
      console.log("根据搜索位置更新经纬度");
    }
  }, [searchedLocationFromRedux, hasInitialDataLoaded]);

  // 设置定时器，每分钟刷新一次数据，并且初次立即执行更新
  useEffect(() => {
    if (hasInitialDataLoaded) {
      const updateLocation = () => {
        const location =
          searchedLocationFromRedux.length > 0
            ? searchedLocationFromRedux
            : currentLocationFromRedux;
        setLatitude(location[0]);
        setLongitude(location[1]);
      };

      // 立即执行一次更新
      updateLocation();

      // 设置定时器
      const intervalId = setInterval(() => {
        updateLocation();
        setIsTimerUpdated(true);
        console.log(
          `每分钟更新一次数据,当前时间：${formatDate(new Date(), "HH:mm:ss")}`
        );
      }, 1000 * 60 * 5);

      // 清理定时器
      return () => clearInterval(intervalId);
    }
  }, [
    hasInitialDataLoaded,
    searchedLocationFromRedux,
    currentLocationFromRedux,
  ]);

  useEffect(() => {
    if (latitude && longitude) {
      console.log("经纬度已更新, 开始获取天气数据");
      fetchWeatherData();
      setIsTimerUpdated(false);
    }
  }, [
    latitude,
    longitude,
    hasInitialDataLoaded,
    searchedLocationFromRedux,
    currentLocationFromRedux,
    locations,
    isTimerUpdated,
  ]);

  console.log("环境变量：", process.env.REACT_APP_API_BASE_URL);

  const getWeatherData = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/weather-data`,
        {
          params: { latitude, longitude },
        }
      );
      return response.data; // 返回从后端获取的数据
    } catch (error) {
      console.log("Error fetching weather data from backend:", error);
    }
  };

  const hotCitiesFromRedux = useSelector((state) => state.hotCities.hotCities);
  const [selectedCities, setSelectedCities] = useState([]);
  useEffect(() => {
    setSelectedCities(Object.entries(hotCitiesFromRedux));
  }, [hotCitiesFromRedux]);

  useEffect(() => {
    fetchFourCitiesWeatherData(selectedCities);
  }, [selectedCities]);

  const fetchFourCitiesWeatherData = async (selectedCities) => {
    if (selectedCities) {
      const promises = selectedCities.map(([key, [city, country, lat, lng]]) =>
        getWeatherData(lat, lng)
      );

      try {
        const results = await Promise.all(promises);
        const processedData = results.map((data, index) => {
          if (data) {
            return {
              city: _.get(data, "location.name"),
              icon: _.get(data, "current.condition.icon"),
              mintemp: _.get(data, "forecast.forecastday[0].day.mintemp_c"),
              maxtemp: _.get(data, "forecast.forecastday[0].day.maxtemp_c"),
            };
          }
        });
        // console.log("processedData: ", processedData);
        dispatch(setFourHotCitiesWeatherData(processedData));
      } catch (error) {
        console.error("Error processing weather data: ", error);
      }
    }
  };

  const fetchWeatherData = async () => {
    const weatherDataFull = await getWeatherData(latitude, longitude);
    const defaultLanguage = localStorage.getItem("defaultLanguage");
    const isChinese = defaultLanguage?.startsWith("zh");
    console.log("weatherDataFull: ", weatherDataFull);

    if (weatherDataFull) {
      const currentWeatherConditions = {
        pm2_5: _.get(weatherDataFull, "current.air_quality.pm2_5"),
        icon: _.get(weatherDataFull, "current.condition.icon"),
        text: _.get(weatherDataFull, "current.condition.text"),
        code: _.get(weatherDataFull, "current.condition.code"),
        humidity: _.get(weatherDataFull, "current.humidity"),
        temp: _.get(weatherDataFull, "current.temp_c"),
        feelslike: _.get(weatherDataFull, "current.feelslike_c"),
        wind_kph: _.get(weatherDataFull, "current.wind_kph"),
        wind_dir: _.get(weatherDataFull, "current.wind_dir"),
        dewpoint: _.get(weatherDataFull, "current.dewpoint_c"),
        vis: _.get(weatherDataFull, "current.vis_km"),
        precip: _.get(weatherDataFull, "current.precip_mm"),
        uv: _.get(weatherDataFull, "current.uv"),
        pressure: _.get(weatherDataFull, "current.pressure_mb"),
        city: isChinese
          ? _.get(weatherDataFull, "translatedCity")
          : _.get(weatherDataFull, "location.name"),
        sunrise: _.get(
          weatherDataFull,
          "forecast.forecastday[0].astro.sunrise"
        ),
        sunset: _.get(weatherDataFull, "forecast.forecastday[0].astro.sunset"),
        mintemp: _.get(
          weatherDataFull,
          "forecast.forecastday[0].day.mintemp_c"
        ),
        maxtemp: _.get(
          weatherDataFull,
          "forecast.forecastday[0].day.maxtemp_c"
        ),
      };
      // console.log("city in get weather data: ", currentWeatherConditions.city);

      // 使用 _.slice 获取最后四个元素
      const lastFourDays = _.slice(weatherDataFull.forecast.forecastday, 1);
      // 使用 _.map 提取和转换数据
      const futureFourDaysData = _.map(lastFourDays, (item) => ({
        date: item.date,
        maxtemp: item.day.maxtemp_c,
        mintemp: item.day.mintemp_c,
        icon: item.day.condition.icon,
      }));

      const finalData = {
        ...currentWeatherConditions,
        futureFourDaysData,
      };
      // console.log("finalData: ", finalData);
      console.log("天气数据已更新");
      dispatch(setWeatherDataFromRedux(finalData));
      dispatch(setLocation([currentWeatherConditions.city, "", null, false]));
    }
  };

  // return { weatherData, errors };
};

export default useGetWeatherData;
