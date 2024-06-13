import NavBarSettingUnitModal from "./NavBarSettingUnitModal";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Col, Row } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { useEffect, useState } from "react";
import CitySearch from "../../Global/CitySearch/index";
import { useSelector } from "react-redux";
import NavBarSettingHotCityModal from "./HotCity";
import NavBarSettingLanguageModal from "./NavBarSettingLanguageModal";
import { useTranslation } from "react-i18next";

function NavBarSettingSideBarPanel({ show, handleClose }) {
  const { t } = useTranslation();
  const [unitModalShow, setUnitModalShow] = useState(false);
  const [currentLocationModalShow, setCurrentLocationModalShow] =
    useState(false);
  const [hotCityModalShow, setHotCityModalShow] = useState(false);
  const [languageModalShow, setLanguageModalShow] = useState(false);
  const [currentLocation, setCurrentLocation] = useState([]);

  //如果 modalShow 变化就从localStorage中获取储存的当前位置，并赋值给currentLocation
  const isFreshAtCitySearch = useSelector((state) => state.isFresh);

  const currentLocationFromRedux = useSelector(
    (state) => state.currentLocation.currentLocation
  );

  useEffect(() => {
    setCurrentLocation(currentLocationFromRedux);
  }, [isFreshAtCitySearch, currentLocationFromRedux]);

  const handleUnitModalShow = () => {
    setUnitModalShow(true);
  };

  const handleCurrentLocationModalShow = () => {
    setCurrentLocationModalShow(true);
  };

  const handleNavBarSettingHotCityModalShow = () => {
    setHotCityModalShow(true);
  };

  const handleNavBarSettingLanguageModalShow = () => {
    setLanguageModalShow(true);
  };

  const handleUnitModalClose = () => {
    setUnitModalShow(false);
  };

  const handleCurrentLocationModalClose = () => {
    setCurrentLocationModalShow(false);
  };

  const handleNavBarSettingHotCityModalClose = () => {
    setHotCityModalShow(false);
  };

  const handleNavBarSettingLanguageModalClose = () => {
    setLanguageModalShow(false);
  };

  return (
    <>
      <Offcanvas
        className=" text-white  offcanvas-custom  transition-transform duration-300 ease-in-out from-gray-700 to-gray-900 bg-gradient-to-tl"
        show={show}
        onHide={handleClose}
        placement="start"
        // style={{ width: "15%" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>{t("setting")}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup as="ul">
            <ListGroup.Item
              as="li"
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              className="cursor-pointer text-white from-gray-700 to-gray-900 bg-gradient-to-tl"
              onClick={handleCurrentLocationModalShow}
            >
              <Row xs="auto" className="flex items-center">
                <Col>
                  <FontAwesomeIcon
                    icon="fa-solid fa-location-dot"
                    className="w-6"
                  />
                  <span className="ml-2">{t("current-location")} </span>
                  <span className="ml-2">
                    {currentLocation ? currentLocation[0] : "Not Set"}
                  </span>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              className="cursor-pointer text-white from-gray-700 to-gray-900 bg-gradient-to-tl"
              onClick={handleUnitModalShow}
            >
              <Row xs="auto" className=" flex  items-center ">
                <Col>
                  <FontAwesomeIcon icon="fa-solid fa-ruler" className="w-6" />
                  <span className="ml-2">{t("unit")}</span>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              className="cursor-pointer text-white from-gray-700 to-gray-900 bg-gradient-to-tl"
              onClick={handleNavBarSettingLanguageModalShow}
            >
              <Row xs="auto" className="flex items-center">
                <Col>
                  <FontAwesomeIcon
                    icon="fa-solid fa-language"
                    className="w-6"
                  />
                  <span className="ml-2">{t("language")}</span>
                </Col>
              </Row>
            </ListGroup.Item>
            <ListGroup.Item
              as="li"
              style={{
                borderLeft: "none",
                borderRight: "none",
                borderRadius: 0,
              }}
              className="cursor-pointer text-white from-gray-700 to-gray-900 bg-gradient-to-tl"
              onClick={handleNavBarSettingHotCityModalShow}
            >
              <Row xs="auto" className="flex items-center">
                <Col>
                  <FontAwesomeIcon
                    icon="fa-solid fa-tree-city"
                    className="w-6"
                  />
                  <span className="ml-2">{t("hotCity")}</span>
                </Col>
              </Row>
            </ListGroup.Item>
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>
      <NavBarSettingUnitModal
        show={unitModalShow}
        handleClose={handleUnitModalClose}
      />
      <CitySearch
        show={currentLocationModalShow}
        handleClose={handleCurrentLocationModalClose}
      />
      <NavBarSettingHotCityModal
        show={hotCityModalShow}
        handleClose={handleNavBarSettingHotCityModalClose}
      />
      <NavBarSettingLanguageModal
        handleClose={handleNavBarSettingLanguageModalClose}
        show={languageModalShow}
      />
    </>
  );
}

export default NavBarSettingSideBarPanel;
