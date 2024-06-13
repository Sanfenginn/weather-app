import CitySearchBar from "../../Global/CitySearch/CitySearchBar";
import useGetCity from "../../Global/CitySearch/useGetCity";

function NavBarSearchBar() {
  const {
    options,
    inputValue,
    value,
    city,
    country,
    setInputValue,
    setValue,
    setCity,
    setCountry,
    getPlaces,
    setOptions,
    latLng,
    setLatLng,
    timeZone,
    setTimeZone,
  } = useGetCity(true);

  const NavBarSearchBarPanel = true;

  const searchCityBarProps = {
    options,
    inputValue,
    value,
    city,
    country,
    setInputValue,
    setValue,
    setCity,
    setCountry,
    getPlaces,
    setOptions,
    latLng,
    setLatLng,
    NavBarSearchBarPanel,
    timeZone,
    setTimeZone,
  };

  return (
    <div className="w-full">
      <CitySearchBar {...searchCityBarProps} show={true} />
    </div>
  );
}

export default NavBarSearchBar;
