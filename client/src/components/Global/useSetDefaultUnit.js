import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useSetDefaultUnit = () => {
  const location = useSelector((state) => state.location);
  const [, country] = location;

  const dispatch = useDispatch();

  const storedUnit = localStorage.getItem("unit");

  useEffect(() => {
    const countryUseImperial = ["US", "USA", "LR", "Liberia", "MM", "Myanmar"];

    if (!storedUnit) {
      countryUseImperial.includes(country)
        ? localStorage.setItem("unit", "Imperial")
        : localStorage.setItem("unit", "Metric");
    }
  }, [country, dispatch, storedUnit]);
};

export default useSetDefaultUnit;
