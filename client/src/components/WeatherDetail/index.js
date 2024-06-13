import WeatherDetails from "./WeatherDetails";
import WeatherDetailSummary from "./WeatherDetailSummary";
import useGetWeatherData from "../Global/useGetWeatherData";
import { useElasticFadeIn } from "../Global/useFadeInAnimations";
import { animated } from "react-spring";

function WeatherDetail() {
  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);
  useGetWeatherData();
  return (
    <animated.div
      style={elasticFadeIn300}
      className="flex gap-[1rem] lg:h-[35rem] rounded-4xl-custom"
    >
      <div className=" h-full flex-grow-1  hover:shadow-2xl max-w-[327px]  transition-shadow duration-300 from-blue-600 via-blue-500 to-blue-400 bg-gradient-to-tl text-white lg:rounded-4xl-custom ">
        <WeatherDetailSummary />
      </div>
      <div className=" flex-grow-1 rounded-4xl-custom  h-full">
        <WeatherDetails />
      </div>
    </animated.div>
  );
}

export default WeatherDetail;
