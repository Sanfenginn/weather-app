import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { useTranslation } from "react-i18next";

function NavBarSettingUnitModal({ show, handleClose }) {
  const { t } = useTranslation();
  const defaultUnit = localStorage.getItem("unit");
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isClick, setIsClick] = useState(false);

  const handleUnitChange = (event) => {
    setIsClick(true);
    setSelectedUnit(event.target.value);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault(); // 阻止默认行为，比如表单提交
      handleSave(); // 如果是热门城市面板，调用添加城市的函数
    }
  };

  const handleSave = () => {
    if (!isClick) {
      handleClose();
    } else {
      localStorage.setItem("unit", selectedUnit);
      setIsClick(false);
      handleClose();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onKeyDown={handleKeyDown}
      tabIndex="-1"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {t("unit")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            label={t("metric")}
            value="Metric"
            name="group1"
            type="radio"
            id="radio-metric"
            className="mb-3 clickable-cursor"
            defaultChecked={defaultUnit === "Metric"}
            onChange={handleUnitChange}
          />
          <Form.Check
            label={t("imperial")}
            value="Imperial"
            name="group1"
            type="radio"
            id="radio-imperial"
            defaultChecked={defaultUnit === "Imperial"}
            onChange={handleUnitChange}
            className="clickable-cursor"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} className="w-15">
          Close
        </Button>
        <Button variant="primary" onClick={handleSave} className="w-15">
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NavBarSettingUnitModal;
