import { useSelector } from "react-redux";
import WeatherDetailsMetricsCards from "./WeatherDetailsMetricsCards";
import { useTranslation } from "react-i18next";
import Placeholder from "../../../Global/Placeholder";
import { useState } from "react";
import { useEffect } from "react";

function WeatherDetailsMetrics() {
  const [dataLoaded, setDataLoaded] = useState(false); // 新状态标识数据是否加载
  const { t } = useTranslation();
  const [weatherData, setWeatherData] = useState([]);
  const weatherDataFromRedux = useSelector(
    (state) => state.weatherData.weatherData
  );

  useEffect(() => {
    if (Object.keys(weatherDataFromRedux || {}).length > 0) {
      setWeatherData(weatherDataFromRedux);
      setDataLoaded(true);
    }
  }, [weatherDataFromRedux, dataLoaded]);

  const { pressure, vis, uv } = weatherData;

  const metricData = [
    {
      icon: "fa-solid fa-sun",
      title: t("uvIndex"),
      value: uv,
      gradient: "from-teal-400 to-teal-600",
      gradientDirection: "bg-gradient-to-tl",
      type: "uv",
    },
    {
      icon: "fa-solid fa-gauge",
      title: t("pressure"),
      value: pressure,
      gradient: "from-cyan-400 to-cyan-600",
      gradientDirection: "bg-gradient-to-tl",
      type: "pressure",
    },
    {
      icon: "fa-solid fa-eye",
      title: t("visibility"),
      value: vis,
      gradient: "from-green-400 to-green-600",
      gradientDirection: "bg-gradient-to-tl",
      type: "visibility",
    },
  ];

  return (
    <>
      {dataLoaded ? (
        <>
          <div className=" gap-4  flex  w-full h-full text-sm rounded-2xl">
            {metricData.map((item, index) => (
              <div
                className=" flex-1 min-w-0 inset-0 rounded-2xl hover:scale-110 transition-transform duration-400 "
                key={index}
              >
                <WeatherDetailsMetricsCards
                  icon={item.icon}
                  title={item.title}
                  value={item.value}
                  gradient={item.gradient}
                  gradientDirection={item.gradientDirection}
                  type={item.type}
                />
              </div>
            ))}
          </div>
        </>
      ) : (
        <div className="h-full w-[100px]">
          <Placeholder />
        </div>
      )}
    </>
  );
}

export default WeatherDetailsMetrics;
