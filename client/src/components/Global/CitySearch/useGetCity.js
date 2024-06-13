import { useState, useEffect } from "react";
import axios from "axios";

const useGetCity = (show) => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState(null);
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const [latLng, setLatLng] = useState([]);
  const [timeZone, setTimeZone] = useState("");

  useEffect(() => {
    if (show) {
      setInputValue(" ");
      setOptions([]);
      setValue(null);
    }
  }, [show]);

  const getPlaces = async (input) => {
    const defaultLanguage = localStorage.getItem("defaultLanguage");
    const isChinese = defaultLanguage && defaultLanguage.startsWith("zh");
    const language = isChinese ? defaultLanguage : "en";

    try {
      const responseForPlaceId = await axios.get(
        "http://localhost:51003/api/places",
        {
          params: { input: input, language: language },
        }
      );
      const dataForPlaceId = responseForPlaceId.data;
      // console.log("dataForPlaceId: ", dataForPlaceId);

      const getLatLngsAndTimeZone = async (placeId) => {
        const responseForLatLng = await axios.get(
          "http://localhost:51003/api/place-details",
          {
            params: { place_id: placeId },
          }
        );
        const info = responseForLatLng.data;
        const latLngs = info.result.geometry.location;
        // console.log("info: ", info);

        const responseForTimeZone = await axios.get(
          "http://localhost:51003/api/place-timezone", // 更新路径
          {
            params: { lat: latLngs.lat, lng: latLngs.lng },
          }
        );
        const timeZone = responseForTimeZone.data.timeZoneId;
        return { latLngs, timeZone };
      };

      // 获取城市的详细信息
      const cityAndCountryAndTimezoneArr = await Promise.all(
        dataForPlaceId.predictions.map(async (obj) => {
          const { latLngs, timeZone } = await getLatLngsAndTimeZone(
            obj.place_id
          );
          return {
            label: obj.description,
            placeId: obj.place_id,
            mainText: obj.structured_formatting.main_text,
            country: obj.terms[obj.terms.length - 1].value,
            latlngs: latLngs,
            timeZone: timeZone,
          };
        })
      );

      // 设置选项
      setOptions(cityAndCountryAndTimezoneArr);
    } catch (error) {
      console.error("Error fetching places:", error);
    }
  };

  return {
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
};

export default useGetCity;
