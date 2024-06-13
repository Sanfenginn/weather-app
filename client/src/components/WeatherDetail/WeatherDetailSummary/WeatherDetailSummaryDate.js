import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import moment from "moment-timezone";
import { useTranslation } from "react-i18next";
import "moment/locale/zh-cn";
import "moment/locale/en-gb";
import { useElasticFadeIn } from "../../Global/useFadeInAnimations";
import { animated } from "react-spring";
import Placeholder from "./Placeholder";

function WeatherDetailSummaryDate() {
  const { i18n } = useTranslation();
  const currentPlaceTimezoneFromRedux = useSelector(
    (state) => state.currentPlaceTimezone
  );
  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  const hasInitialDataLoaded = useSelector(
    (state) => state.hasInitialDataLoadedToSetTimezone
  );

  const currentPlaceTimezoneFromCurrentLocation = currentLocationFromRedux
    ? currentLocationFromRedux[4]
    : null;

  const currentTimezone = !hasInitialDataLoaded
    ? currentPlaceTimezoneFromCurrentLocation
    : currentPlaceTimezoneFromRedux;

  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    if (!currentTimezone) return;
    const updateDateTime = () => {
      const format =
        i18n.language === "zh-cn" || i18n.language === "zh-CN"
          ? "M月D日 dddd HH:mm:ss"
          : "DD MMMM, dddd HH:mm:ss";
      setCurrentDateTime(moment().tz(currentTimezone).format(format));
    };

    moment.locale(i18n.language);
    updateDateTime();

    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, [i18n.language, currentTimezone]);

  const [key, setKey] = useState(0);

  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [currentDateTime]);

  const elasticFadeIn400 = useElasticFadeIn(key, 400, 170, 12);

  return (
    <animated.div
      style={elasticFadeIn400}
      className=" flex justify-center   lg:h-full "
    >
      {currentDateTime}
    </animated.div>
  );
}

export default WeatherDetailSummaryDate;
