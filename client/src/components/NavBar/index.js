import NavBarSearchBar from "./NavBarSearchBar";
import NavBarCityDisplayAndSelect from "./NavBarCityDisplay";
import NavBarSetting from "./NavBarSetting";
import { useElasticFadeIn } from "../Global/useFadeInAnimations";
import { animated } from "react-spring";

function NavBar() {
  const elasticFadeIn300 = useElasticFadeIn(300, 170, 12);

  return (
    <animated.div
      style={elasticFadeIn300}
      className="grid grid-cols-11 lg:grid-cols-12 w-full"
    >
      <div className=" lg:col-span-2 hidden lg:block">
        <NavBarCityDisplayAndSelect />
      </div>
      <div className="col-span-10 mr-3 lg:col-span-9 ">
        <NavBarSearchBar />
      </div>
      <div className="col-span-1 lg:col-span-1  ">
        <NavBarSetting />
      </div>
    </animated.div>
  );
}

export default NavBar;
