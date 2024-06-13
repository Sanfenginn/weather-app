import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import NavBarSettingSideBarPanel from "./NavBarSettingPanel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useTranslation } from "react-i18next";

function NavBarSetting() {
  const [show, setShow] = useState(false);
  const { t } = useTranslation();

  const toggleSidebar = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div className="flex justify-center items-center h-full">
      <OverlayTrigger
        key="bottom"
        placement="bottom"
        overlay={
          <Tooltip id="tooltip-bottom" className="mt-2">
            {t("setting")}
          </Tooltip>
        }
      >
        <FontAwesomeIcon
          icon="fa-solid fa-gear"
          className="cursor-pointer text-2xl text-blue-500 hover:scale-125 transition-transform duration-400"
          onClick={toggleSidebar}
        />
      </OverlayTrigger>
      <NavBarSettingSideBarPanel show={show} handleClose={handleClose} />
    </div>
  );
}

export default NavBarSetting;
