import { useSelector, useDispatch } from "react-redux";
import formatValue from "../../Global/formatValue";
import setWeatherIconUrl from "../../Global/useSetWeatherIconUrl";
import adjustCityName from "../../Global/adjustCityName";
import { setLocation } from "../../Redux/LocationSlice";
import { useEffect } from "react";
import { animated } from "react-spring";
import {
  useElasticFadeIn,
  useSlideUpDescription,
} from "../../Global/useFadeInAnimations";
import { useState } from "react";
import Placeholder from "./Placeholder";

function WeatherDetailSummaryOverview() {
  const [weatherData, setWeatherData] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false); // 新状态标识数据是否加载
  const dispatch = useDispatch();
  const weatherDataFromRedux = useSelector(
    (state) => state.weatherData.weatherData
  );

  useEffect(() => {
    if (Object.keys(weatherDataFromRedux || {}).length > 0) {
      setWeatherData(weatherDataFromRedux);
      setDataLoaded(true);
    }
  }, [weatherDataFromRedux]);

  const { city, country, temp, icon, mintemp, maxtemp } = weatherData;

  //用来更新 LocationSlice 中的 location 数据
  useEffect(() => {
    if (weatherDataFromRedux) {
      dispatch(setLocation([adjustCityName(city), country, null, false]));
    }
  }, [weatherDataFromRedux, city, country, dataLoaded]);

  const [key, setKey] = useState(0);
  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [city, country, temp, icon, mintemp, maxtemp]);

  const elasticFadeIn500 = useElasticFadeIn(key, 500, 170, 12);
  const slideUpDescription600 = useSlideUpDescription(key, 600);
  const elasticFadeIn700 = useElasticFadeIn(key, 700, 170, 12);
  const elasticFadeIn800 = useElasticFadeIn(key, 800, 170, 12);

  return (
    <div className=" h-full  flex flex-col  lg:grid  lg:grid-rows-5 ">
      {dataLoaded ? (
        <>
          <animated.div
            style={elasticFadeIn500}
            className="font-bold text-[1.5rem] flex justify-center items-center row-span-1 "
          >
            {adjustCityName(city)}
          </animated.div>
          <div className="lg:row-span-2 flex flex-col  justify-center items-center">
            <animated.div
              className="text-[3.5rem] font-bold"
              style={slideUpDescription600}
            >
              {formatValue(temp, "temp")}
            </animated.div>
            <animated.div style={elasticFadeIn700}>{`${formatValue(
              mintemp,
              "temp"
            )} ~ ${formatValue(maxtemp, "temp")}`}</animated.div>
          </div>
          <div className="flex flex-col justify-center items-center row-span-2">
            <animated.img
              className="w-50 "
              src={setWeatherIconUrl(icon)}
              alt="weather condition icon"
              style={elasticFadeIn800}
            />
          </div>
        </>
      ) : (
        <div className=" w-[100px] placeholder-height">
          <Placeholder />
        </div>
      )}
    </div>
  );
}

export default WeatherDetailSummaryOverview;
