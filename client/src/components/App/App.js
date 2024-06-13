import NavBar from "../NavBar/index";
import WeatherDetail from "../WeatherDetail/index";
import useSetDefaultUnit from "../Global/useSetDefaultUnit";
import findMyLocation from "../Global/useFindMyLocation";
import { setLocation } from "../Redux/LocationSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import useSetDefaultHotCities from "../Global/useSetDefaultHotCities";
import useGetWeatherData from "../Global/useGetWeatherData";
import useSetDefaultLanguage from "../Global/useSetDefaultLanguage";
import NavBarBottom from "../NavBarBottom/index";
import useWindowSize from "./useWindowSize";
import WeatherDetailSummary from "../WeatherDetail/WeatherDetailSummary/index";
import WeatherDetailsMetrics from "../WeatherDetail/WeatherDetails/WeatherDetailsMetrics/index";
import CityCard from "../WeatherDetail/WeatherDetails/CityCard/index";
import WeatherDetailsFutureFourDays from "../WeatherDetail/WeatherDetails/WeatherDetailsFutureFourDays/index";

function App() {
  const [activeTab, setActiveTab] = useState(0);
  const screenWidth = useWindowSize();
  const isMobile = screenWidth < 1024;

  const dispatch = useDispatch();
  const [currentLocation, setCurrentLocation] = useState([]);
  const isFreshAtCitySearch = useSelector((state) => state.isFresh.isFresh);
  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  const [city, country, error, loading] = findMyLocation();

  useSetDefaultUnit();
  useSetDefaultHotCities();
  useGetWeatherData();
  useSetDefaultLanguage();

  useEffect(() => {
    setCurrentLocation(currentLocationFromRedux);
  }, [isFreshAtCitySearch, currentLocationFromRedux]);

  useEffect(() => {
    if (currentLocation) {
      const [city, country] = currentLocation;
      dispatch(setLocation([city, country, null, false]));
    } else {
      dispatch(setLocation([city, country, error, loading]));
    }
  }, [city, country, error, loading, currentLocation, isFreshAtCitySearch]);

  return (
    <div className=" min-h-screen  lg:flex justify-center items-center  bg-cover bg-center opacity-75 bg-custom-image from-indigo-300 to-indigo-600 -z-10">
      <div className="  border-1  flex flex-col  lg:max-h-[45rem] w-full lg:max-w-[70rem]  lg:rounded-4xl-custom lg:p-6  bg-slate-100">
        <div className="lg:mb-4 mt-[1.5rem] lg:mt-0 ">
          <NavBar />
        </div>
        {isMobile ? (
          <>
            <div>
              {activeTab === 0 && (
                <WeatherDetailSummary
                  className={isMobile ? "overflow-hidden" : ""}
                />
              )}
              {activeTab === 1 && (
                <div>
                  <WeatherDetailsMetrics />
                  <WeatherDetailsFutureFourDays />
                  <CityCard />
                </div>
              )}
            </div>
            {/* <div className="lg:hidden">
              <NavBarBottom onTabSelect={setActiveTab} />
            </div> */}
          </>
        ) : (
          <div className=" flex-grow">
            <WeatherDetail />
          </div>
        )}
        <div className="lg:hidden">
          <NavBarBottom onTabSelect={setActiveTab} />
        </div>
      </div>
    </div>
  );
}

export default App;
