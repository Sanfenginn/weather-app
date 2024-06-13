import WeatherDetailSummaryOverview from "./ WeatherDetailSummaryOverview";
import WeatherDetailSummaryDate from "./WeatherDetailSummaryDate";
import WeatherDetailSummaryMetrics from "./ WeatherDetailSummaryMetrics";

function WeatherDetailSummary() {
  return (
    <div className="lg:p-6 h-full lg:grid lg:grid-rows-10">
      <div className=" lg:row-span-1">
        <WeatherDetailSummaryDate />
      </div>
      <div className="lg:row-span-7">
        <WeatherDetailSummaryOverview />
      </div>
      <div className="lg:row-span-2">
        <WeatherDetailSummaryMetrics />
      </div>
    </div>
  );
}

export default WeatherDetailSummary;
