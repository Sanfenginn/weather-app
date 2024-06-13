import WeatherDetailsFutureFourDays from "./WeatherDetailsFutureFourDays";
import CityCard from "./CityCard";
import WeatherDetailsMetrics from "./WeatherDetailsMetrics/index";

function WeatherDetails() {
  return (
    <div className="  grid grid-rows-12 h-full">
      <div className=" row-span-3 w-full">
        <WeatherDetailsMetrics />
      </div>
      <div className="  row-span-6 ">
        <WeatherDetailsFutureFourDays />
      </div>
      <div className="  row-span-3">
        <CityCard />
      </div>
    </div>
  );
}

export default WeatherDetails;
