import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useDispatch, useSelector } from "react-redux";
import { setLocation } from "../../Redux/LocationSlice";
import { setIsFreshInStore } from "../../Redux/isFreshSlice";
import useGetCity from "./useGetCity";
import CitySearchBar from "./CitySearchBar";
import { setCurrentLocation } from "../../Redux/CurrentLoationSlice";
import { setSearchedLocation } from "../../Redux/SearchedLocationSlice";
import { setCurrentPlaceTimezone } from "../../Redux/CurrentPlaceTimezoneSlice";
import { setHasInitialDataLoadedToSetTimezone } from "../../Redux/hasInitialDataLoadedToSetTimezoneSlice";
import { useTranslation } from "react-i18next";

function CitySearch({ show, handleClose, isUpdateCurrentLocation }) {
  const [isFresh, setIsFresh] = useState(false);
  const dispatch = useDispatch();
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
  } = useGetCity(show);

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
    timeZone,
    setTimeZone,
  };

  const { t } = useTranslation();

  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  const handleSave = () => {
    dispatch(
      setCurrentLocation([city, country, latLng[0], latLng[1], timeZone])
    );
    dispatch(setSearchedLocation([latLng[0], latLng[1]]));
    dispatch(setLocation([city, country, null, false]));
    dispatch(setCurrentPlaceTimezone(timeZone));
    dispatch(setHasInitialDataLoadedToSetTimezone(true));
    setIsFresh(true);
    handleClose();
  };

  useEffect(() => {
    dispatch(setIsFreshInStore(isFresh));
  }, [isFresh, dispatch]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <span>{t("current-location")}</span>
          <span>
            {currentLocationFromRedux ? currentLocationFromRedux[0] : "Not Set"}
          </span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CitySearchBar {...searchCityBarProps} handleSave={handleSave} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="w-15">
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} className="w-15">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CitySearch;
