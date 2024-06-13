import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import moment from "moment";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";
import { animated } from "react-spring";
import { useElasticFadeIn } from "../../../Global/useFadeInAnimations";

function formatDate(date, format, language) {
  moment.locale(language);
  return moment(date).format(format);
}

function formatValue(value, type) {
  if (type === "temp") {
    return `${value}°`;
  }
  return value;
}

function WeatherDetailsFutureFourDays() {
  const { i18n } = useTranslation();
  const weatherDataFromRedux = useSelector(
    (state) => state.weatherData.weatherData
  );

  const [futureFourDaysData, setFutureFourDaysData] = useState([]);

  useEffect(() => {
    if (weatherDataFromRedux?.futureFourDaysData) {
      setFutureFourDaysData(
        Object.entries(weatherDataFromRedux.futureFourDaysData)
      );
    }
  }, [weatherDataFromRedux]);

  useEffect(() => {
    moment.locale(i18n.language);
  }, [i18n.language]);

  const getDateFormat = (language) => {
    return language === "zh-cn" || language === "zh-CN" ? "M月D日" : "DD MMMM";
  };

  const [key, setKey] = useState(0);

  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [futureFourDaysData]);

  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);
  const elasticFadeIn400 = useElasticFadeIn(key, 400, 170, 12);
  const elasticFadeIn500 = useElasticFadeIn(key, 500, 170, 12);
  const elasticFadeIn600 = useElasticFadeIn(key, 600, 170, 12);
  const elasticFadeIn700 = useElasticFadeIn(key, 700, 170, 12);

  return (
    <animated.div
      style={elasticFadeIn300}
      className=" flex justify-center items-center h-full w-full"
    >
      <div className=" h-full w-full grid grid-cols-4 place-items-center">
        {futureFourDaysData.map((day, index) => (
          <div
            key={index}
            className="gap-3 w-full h-full flex flex-col justify-center items-center"
          >
            <animated.div
              style={elasticFadeIn400}
              className="font-bold text-lg"
            >
              {formatDate(day[1].date, "dddd", i18n.language)}
            </animated.div>
            <animated.div style={elasticFadeIn500}>
              {formatDate(
                day[1].date,
                getDateFormat(i18n.language),
                i18n.language
              )}
            </animated.div>
            <animated.img
              style={elasticFadeIn600}
              className="w-3/4"
              src={`https:${day[1].icon}`}
              alt="weather icon"
            />
            <animated.div style={elasticFadeIn700}>
              {`${formatValue(day[1].mintemp, "temp")} ~ ${formatValue(
                day[1].maxtemp,
                "temp"
              )}`}
            </animated.div>
          </div>
        ))}
      </div>
    </animated.div>
  );
}

export default WeatherDetailsFutureFourDays;
