import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentLocation } from "../Redux/CurrentLoationSlice";
import { setSearchedLocation } from "../Redux/SearchedLocationSlice";

const useFindMyLocation = () => {
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [timezone, setTimezone] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  const [needLocation, setNeedLocation] = useState(false);

  useEffect(() => {
    if (currentLocationFromRedux.length === 0) {
      setNeedLocation(true);
      console.log("当前位置不存在，需要定位");
    } else {
      console.log("当前位置存在，不需要定位");
    }
  }, [currentLocationFromRedux, needLocation]);

  useEffect(() => {
    if (!needLocation) {
      return;
    }

    const getCityAndCountryNameByLocation = async (latitude, longitude) => {
      console.log("开始通过 定位 获取位置");
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:4000/api/location-by-coords`,
          {
            params: { latitude, longitude },
          }
        );
        const cityFromRes = response.data.city;
        const countryFromRes = response.data.country;
        const timezoneFromRes = response.data.timezone;
        setCity(cityFromRes);
        setCountry(countryFromRes.toUpperCase());
        setLatitude(latitude);
        setLongitude(longitude);
        setTimezone(timezoneFromRes);
        setLoading(false);
        console.log("通过 定位 获取城市", cityFromRes, countryFromRes);
        setNeedLocation(false);
        console.log("needLocation3", needLocation);
      } catch (error) {
        setError("Unable to retrieve city and country name.");
        setLoading(false);
      }
    };

    const getCityAndCountryNameByIP = async () => {
      console.log("开始通过 IP 获取位置");
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:4000/api/location-by-ip"
        );
        const cityFromRes = response.data.city;
        const countryFromRes = response.data.country;
        const latitudeFromRes = response.data.latitude;
        const longitudeFromRes = response.data.longitude;
        const timezoneFromRes = response.data.timezone;
        setCity(cityFromRes);
        setCountry(countryFromRes);
        setLatitude(latitudeFromRes);
        setLongitude(longitudeFromRes);
        setTimezone(timezoneFromRes);
        setLoading(false);
        console.log("通过 IP 获取城市", cityFromRes, countryFromRes);
        setNeedLocation(false);
        console.log("needLocation3", needLocation);
      } catch (error) {
        setError("Unable to retrieve City and Country name.");
        setLoading(false);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getCityAndCountryNameByLocation(latitude, longitude);
          console.log("开始通过 定位 获取位置");
        },
        (error) => {
          console.error("Geolocation error:", error);
          getCityAndCountryNameByIP();
          console.log("开始通过 IP 获取位置");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      getCityAndCountryNameByIP();
    }
  }, [needLocation]);

  useEffect(() => {
    if (city && country && latitude && longitude) {
      dispatch(
        setCurrentLocation([city, country, latitude, longitude, timezone])
      );
      dispatch(setSearchedLocation([latitude, longitude, timezone]));
    }
  }, [city, country, latitude, longitude, timezone]);

  return [city, country, error, loading];
};

export default useFindMyLocation;
