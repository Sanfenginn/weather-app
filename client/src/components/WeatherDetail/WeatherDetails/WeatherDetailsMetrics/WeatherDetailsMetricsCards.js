import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import formatValue from "../../../Global/formatValue";
import getMetricsDescription from "./useGetMetricsDescription";
import getMetricsClass from "./getMetricsClass";
import { animated } from "react-spring";
import { useTranslation } from "react-i18next";
import {
  useElasticFadeIn,
  useSlideUpDescription,
} from "../../../Global/useFadeInAnimations";
import { useEffect, useState } from "react";

function WeatherDetailsMetricsCards({
  icon,
  title,
  value,
  gradient,
  gradientDirection,
  type,
}) {
  const { t } = useTranslation();
  const classNameKey = getMetricsClass(value, type);
  const metricsClass = classNameKey ? t(classNameKey) : "";
  const descriptionKey = getMetricsDescription(value, type);
  const description = descriptionKey ? t(descriptionKey) : ""; // 进行实际的翻译

  const [key, setKey] = useState(0);
  // 每次 weatherData 更新时，更新 key 值
  useEffect(() => {
    setKey((prevKey) => prevKey + 1);
  }, [icon, title, value, gradient, gradientDirection, type]);

  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);
  const elasticFadeIn400 = useElasticFadeIn(key, 400, 170, 12);
  const elasticFadeIn500 = useElasticFadeIn(key, 500, 170, 12);
  const slideUpDescription500 = useSlideUpDescription(key, 500);

  return (
    <animated.div
      style={elasticFadeIn300}
      className={`flex flex-col justify-between ${gradientDirection} ${gradient} text-white opacity-85 h-full p-2.5 rounded-2xl`}
    >
      <animated.div
        style={elasticFadeIn400}
        className="space-x-1 flex just items-center"
      >
        <FontAwesomeIcon icon={icon} className="" />
        <div className="font-bold">{title}</div>
      </animated.div>
      <div>
        <animated.div style={elasticFadeIn500} className="font-bold text-2xl">
          {formatValue(value, type)}
        </animated.div>
        <animated.div
          style={slideUpDescription500}
          className="font-bold text-1xl"
        >
          {metricsClass}
        </animated.div>
      </div>
      <animated.div style={slideUpDescription500} className="text-xs">
        {description}
      </animated.div>
    </animated.div>
  );
}

export default WeatherDetailsMetricsCards;
