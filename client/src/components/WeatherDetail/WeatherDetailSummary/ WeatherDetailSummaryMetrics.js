import { useSelector } from "react-redux";
import formatValue from "../../Global/formatValue";
import { animated } from "react-spring";
import { useState, useEffect } from "react";
import { useElasticFadeIn } from "../../Global/useFadeInAnimations";
import Placeholder from "./Placeholder";

function WeatherDetailSummaryMetrics() {
  const weatherDataFromRedux = useSelector(
    (state) => state.weatherData.weatherData
  );
  const [dataLoaded, setDataLoaded] = useState(false); // 新状态标识数据是否加载
  const [weatherData, setWeatherData] = useState({});

  useEffect(() => {
    if (Object.keys(weatherDataFromRedux || {}).length > 0) {
      setWeatherData(weatherDataFromRedux);
      setDataLoaded(true);
    }
  }, [dataLoaded, weatherDataFromRedux]); // 依赖于数据加载状态

  const { humidity, pm2_5, feelslike, wind_kph } = weatherData;

  const [key, setKey] = useState(0);

  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [humidity, pm2_5, feelslike, wind_kph]);

  const elasticFadeIn900 = useElasticFadeIn(900, 170, 12);
  const elasticFadeIn1000 = useElasticFadeIn(1000, 170, 12);
  const elasticFadeIn1100 = useElasticFadeIn(key, 1100, 170, 12);

  return (
    <>
      {dataLoaded ? (
        <>
          <animated.div
            style={elasticFadeIn900}
            className=" p-3 text-sm h-full bg-slate-100 text-black  w-full rounded-2xl grid grid-cols-4 place-items-center"
          >
            <div className="gap-1.5 flex flex-col justify-center items-center  w-[4rem]">
              <animated.img
                style={elasticFadeIn1000}
                src="/assets/images/metric-icon/humidity.svg"
                alt="humidity"
              />
              <animated.span style={elasticFadeIn1100}>
                {formatValue(humidity, "percentage")}
              </animated.span>
            </div>
            <div className="gap-1.5 flex flex-col justify-center items-center  w-[4rem]">
              <animated.img
                style={elasticFadeIn1000}
                src="/assets/images/metric-icon/wind_speed.svg"
                alt="wind speed"
              />
              <animated.span style={elasticFadeIn1100}>
                {formatValue(wind_kph, "wind")}
              </animated.span>
            </div>
            <div className="gap-1.5 flex flex-col justify-center items-center  w-[4rem]">
              <animated.img
                style={elasticFadeIn1000}
                src="/assets/images/metric-icon/PM2.5.svg"
                alt="PM2.5"
              />
              <animated.span style={elasticFadeIn1100}>
                {formatValue(pm2_5, "pm2.5")}
              </animated.span>
            </div>
            <div className="gap-1.5 flex flex-col justify-center items-center  w-[4rem]">
              <animated.img
                style={elasticFadeIn1000}
                src="/assets/images/metric-icon/Somatosensory_temperature.svg"
                alt="feels like temperature"
              />
              <animated.span style={elasticFadeIn1100}>
                {formatValue(feelslike, "temp")}
              </animated.span>
            </div>
          </animated.div>
        </>
      ) : (
        <div className="h-full w-[100px]">
          <Placeholder />
        </div>
      )}
    </>
  );
}

export default WeatherDetailSummaryMetrics;
