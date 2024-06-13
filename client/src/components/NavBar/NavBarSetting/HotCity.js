import { useState, useEffect } from "react";
import { Button } from "@mui/material";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import useGetCity from "../../Global/CitySearch/useGetCity";
import CitySearchBar from "../../Global/CitySearch/CitySearchBar";
import { Col, Container, Row, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { removeHotCities } from "../../Redux/HotCitySlice";
import adjustCityName from "../../Global/adjustCityName";

function NavBarSettingHotCityModal({ show, handleClose }) {
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
  } = useGetCity(true);

  const hotCityPanel = true;

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
    hotCityPanel,
    latLng,
    setLatLng,
    timeZone,
    setTimeZone,
  };

  const dispatch = useDispatch();

  const [selectedCities, setSelectedCities] = useState([]);
  const hotCitiesFromRedux = useSelector((state) => state.hotCities.hotCities);

  useEffect(() => {
    setSelectedCities(Object.entries(hotCitiesFromRedux));
  }, [hotCitiesFromRedux]);

  const handleRemoveSelectedCity = (order, city, country, index) => {
    return () => {
      dispatch(removeHotCities(order));
      setSelectedCities((prev) => {
        // 使用 filter 来创建一个新数组，其中不包含要删除的城市
        return prev.filter((_, idx) => idx !== index);
      });
    };
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Hot City</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <CitySearchBar
            {...searchCityBarProps}
            show={true}
            // key={hotCityPanel ? "panel-true" : "panel-false"}
          />
          <Container className="mt-4">
            <Row>
              {selectedCities.map(([order, [city, country]], index) => (
                <Col key={index} md="3">
                  <Card className="mb-3 border-0">
                    <Card.Img
                      variant="top"
                      src={`${
                        process.env.PUBLIC_URL
                      }/assets/images/city-icon/${adjustCityName(city)}.png`}
                      alt={`${city} View`}
                    />
                    <Card.Body className="flex flex-col">
                      <Card.Title className=" text-center flex flex-col my-3">
                        <span>{city}</span>
                        <span>{country}</span>
                      </Card.Title>
                      <Button
                        className="border border-black"
                        variant="danger"
                        onClick={handleRemoveSelectedCity(
                          order,
                          city,
                          country,
                          index
                        )}
                      >
                        Remove
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          </Container>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="w-15">
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavBarSettingHotCityModal;
