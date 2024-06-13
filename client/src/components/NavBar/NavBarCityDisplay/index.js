import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";
import { useState } from "react";
import CitySearch from "../../Global/CitySearch/index";
import { useElasticFadeIn } from "../../Global/useFadeInAnimations";
import { animated } from "react-spring";

function NavBarCityDisplayAndSelect() {
  const location = useSelector((state) => state.location);
  const [city, , , loading] = location;

  const [selectCityModalShow, setSelectCityModalShow] = useState(false);

  const handleSelectCityShow = () => {
    setSelectCityModalShow(true);
  };

  const handleSelectCityClose = () => {
    setSelectCityModalShow(false);
  };

  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);

  return (
    <>
      <animated.button
        className="cursor-pointer rounded-md w-full h-full hover:border-2 hover:border-blue-500 transition-border duration-400 hover:bg-slate-200 transition-colors "
        onClick={handleSelectCityShow}
        tabIndex={0} // 保证按钮可以通过键盘访问
        style={elasticFadeIn300}
      >
        <div className="w-full justify-center items-center  flex gap-2 h-full  cursor-pointer ">
          <div className="font-bold text-center cursor-pointer ">
            {loading ? "Locating" : city}
          </div>
          <div className=" text-center cursor-pointer ">
            <FontAwesomeIcon icon="fa-solid fa-location-arrow" />
          </div>
        </div>
      </animated.button>
      <CitySearch
        show={selectCityModalShow}
        handleClose={handleSelectCityClose}
      />
    </>
  );
}
export default NavBarCityDisplayAndSelect;
