import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { setHotCities } from "../Redux/HotCitySlice";

const useSetDefaultHotCities = () => {
  const hotCitiesFromRedux = useSelector((state) => state.hotCities.hotCities);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!hotCitiesFromRedux || Object.keys(hotCitiesFromRedux).length === 0) {
      dispatch(
        setHotCities({
          place1: ["Shanghai", "China", 31.230416, 121.473701, "Asia/Shanghai"],
          place2: [
            "Sydney",
            "Australia",
            -33.8688197,
            151.2092955,
            "Australia/Sydney",
          ],
          place3: ["London", "UK", 51.5072178, -0.1275862, "Europe/London"],
          place4: [
            "New York",
            "USA",
            40.7127753,
            -74.0059728,
            "America/New_York",
          ],
        })
      );
    }
  }, []);
};

export default useSetDefaultHotCities;
