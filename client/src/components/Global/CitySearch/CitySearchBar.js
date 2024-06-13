import { Autocomplete, TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import Alert from "react-bootstrap/Alert";
import { setHotCities } from "../../Redux/HotCitySlice";
import { useDispatch, useSelector } from "react-redux";
import { setSearchedLocation } from "../../Redux/SearchedLocationSlice";
import { setCurrentPlaceTimezone } from "../../Redux/CurrentPlaceTimezoneSlice";
import { setHasInitialDataLoadedToSetTimezone } from "../../Redux/hasInitialDataLoadedToSetTimezoneSlice";
import { useTranslation } from "react-i18next";
import { setLocation } from "../../Redux/LocationSlice";

function CitySearchBar({
  show,
  options,
  inputValue,
  value,
  city,
  country,
  setInputValue,
  setValue,
  setCity,
  setCountry,
  latLng,
  setLatLng,
  getPlaces,
  setOptions,
  hotCityPanel,
  NavBarSearchBarPanel,
  timeZone,
  setTimeZone,
}) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    if (show) {
      setInputValue(""); // 清空输入框
      setValue(null); // 清空选中的值
    }
  }, [show, setInputValue, setValue]);

  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const alertMessages = {
    maxCities: "You can only save up to 4 cities.",
    cityExists: "City already exists.",
    emptyCity: "Cannot be empty.",
    addedCity: "City add successfully.",
  };

  const handleAlert = (message) => {
    setShowAlert(true);
    setAlertMessage(message);
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const StoredHotCities = useSelector((state) => state.hotCities.hotCities);

  const storedHotCitiesRef = useRef({}); // 初始化 useRef

  useEffect(() => {
    storedHotCitiesRef.current = { ...StoredHotCities };
  }, [StoredHotCities]);

  const handleAdd = () => {
    const inTimeHotCities = storedHotCitiesRef.current || {};

    const currentKeyNum = Object.keys(inTimeHotCities).length;

    if (!inputValue.trim()) {
      handleAlert(alertMessages.emptyCity);
      return;
    }

    const cityExists = Object.values(inTimeHotCities).some(
      (entry) => entry[0] === city && entry[1] === country
    );
    if (cityExists) {
      handleAlert(alertMessages.cityExists);
      return;
    }

    if (currentKeyNum >= 4) {
      handleAlert(alertMessages.maxCities);
      return;
    }

    const updatedHotCities = {
      ...inTimeHotCities,
      [`place${currentKeyNum + 1}`]: [
        city,
        country,
        latLng[0],
        latLng[1],
        timeZone,
      ],
    };
    dispatch(setHotCities(updatedHotCities));
    handleAlert(alertMessages.addedCity);
    setInputValue(""); // 清空输入框
    setValue(null); // 清空选中的值
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 阻止默认行为，比如表单提交
      if (hotCityPanel) {
        handleAdd(); // 如果是热门城市面板，调用添加城市的函数
      } else if (NavBarSearchBarPanel) {
        handleSubmit(event); // 如果是导航栏搜索面板，调用搜索提交的函数
      }
      // handleSave();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setLocation([city, country, null, false]));
    console.log("city", city);
    dispatch(setSearchedLocation([latLng[0], latLng[1], timeZone]));
    dispatch(setCurrentPlaceTimezone(timeZone));
    dispatch(setHasInitialDataLoadedToSetTimezone(true));
    setInputValue("");
    setValue(null);
  };

  return (
    <div>
      <Autocomplete
        options={options}
        value={value}
        onKeyDown={handleKeyDown}
        noOptionsText={t("noOptions")}
        onChange={(event, newValue) => {
          setValue(newValue);
          setInputValue(newValue ? newValue.label.split(",")[0] : "");
          if (newValue) {
            setCity(newValue.mainText);
            setCountry(newValue.country);
            setLatLng([newValue.latlngs.lat, newValue.latlngs.lng]);
            setTimeZone(newValue.timeZone);
          } else {
            setCity("");
            setCountry("");
          }
        }}
        onInputChange={(event, newInputValue) => {
          setInputValue(newInputValue);
          if (newInputValue) {
            getPlaces(newInputValue);
          } else {
            setOptions([]);
          }
        }}
        isOptionEqualToValue={(option, value) =>
          option.placeId === value.placeId
        }
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
          <div className=" flex  w-full  flex-col ">
            <div className=" w-full flex justify-center items-center gap-3">
              <div className="w-full">
                <TextField
                  {...params}
                  label={t("placeholder")}
                  variant="outlined"
                  fullWidth
                />
              </div>
              {hotCityPanel && (
                <div>
                  <Button
                    variant="outlined"
                    className="ml-2 "
                    onClick={handleAdd}
                  >
                    Add
                  </Button>
                </div>
              )}
              {NavBarSearchBarPanel && (
                <div>
                  <Button
                    variant="outlined"
                    className="ml-2"
                    onClick={handleSubmit}
                  >
                    {t("submit")}
                  </Button>
                </div>
              )}
            </div>
            <div className="w-[42.9rem]">
              {showAlert && (
                <Alert key="primary" variant="primary">
                  {alertMessage}
                </Alert>
              )}
            </div>
          </div>
        )}
      />
    </div>
  );
}

export default CitySearchBar;
