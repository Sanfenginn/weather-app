import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import useGetWeatherData from "../../../Global/useGetWeatherData";
import adjustCityName from "../../../Global/adjustCityName";
import formatValue from "../../../Global/formatValue";
import { animated } from "react-spring";
import { useElasticFadeIn } from "../../../Global/useFadeInAnimations";
import Placeholder from "../../../Global/Placeholder";

function CityCard() {
  useGetWeatherData();
  const [selectedCity, setSelectedCity] = useState([]);
  const [dataLoaded, setDataLoaded] = useState(false); // 新状态标识数据是否加载

  const fourHotCitiesWeatherDataFromRedux = useSelector(
    (state) => state.fourHotCitiesWeatherData.fourHotCitiesWeatherData
  );

  useEffect(() => {
    if (fourHotCitiesWeatherDataFromRedux?.length > 0) {
      setSelectedCity(fourHotCitiesWeatherDataFromRedux);
      setDataLoaded(true);
    }
  }, [dataLoaded, fourHotCitiesWeatherDataFromRedux]);

  const color = [
    "from-blue-400",
    "from-blue-600",
    "from-indigo-400",
    "from-indigo-800",
  ];

  const selectedCityWithColor = selectedCity.map((city, index) => {
    return { ...city, color: color[index] };
  });

  const [key, setKey] = useState(0);
  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [fourHotCitiesWeatherDataFromRedux]);

  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);
  const elasticFadeIn400 = useElasticFadeIn(key, 400, 170, 12);
  const elasticFadeIn500 = useElasticFadeIn(key, 500, 170, 12);
  const elasticFadeIn600 = useElasticFadeIn(key, 600, 170, 12);

  return (
    <>
      {dataLoaded ? (
        <>
          <animated.div
            style={elasticFadeIn300}
            className=" flex gap-3 justify-center items-center w-full h-full"
          >
            {selectedCityWithColor.length > 0 &&
              selectedCityWithColor.map(
                ({ city, icon, mintemp, maxtemp, color }, index) => (
                  <div
                    className="flex-1  h-auto min-w-0 hover:scale-110 transition-transform duration-400 inset-0 opacity-95 rounded-2xl "
                    key={index}
                  >
                    <div
                      className="w-full   rounded-2xl bg-no-repeat bg-center bg-cover"
                      style={{
                        backgroundImage: `url('${
                          process.env.PUBLIC_URL
                        }/assets/images/city-icon/${adjustCityName(
                          city
                        )}.png')`,
                      }}
                    >
                      <div
                        className={`${color}  bg-gradient-to-tl rounded-2xl w-full h-full flex flex-col justify-center items-center text-white`}
                      >
                        <animated.img
                          style={elasticFadeIn400}
                          src={`https:${icon}`}
                          alt="weather icon"
                        />

                        <animated.div
                          style={elasticFadeIn500}
                          className="font-bold"
                        >
                          {adjustCityName(city)}
                        </animated.div>
                        <animated.span style={elasticFadeIn600}>{`${formatValue(
                          mintemp,
                          "temp"
                        )} ~ ${formatValue(maxtemp, "temp")}`}</animated.span>
                        <div></div>
                      </div>
                    </div>
                  </div>
                )
              )}
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

export default CityCard;
