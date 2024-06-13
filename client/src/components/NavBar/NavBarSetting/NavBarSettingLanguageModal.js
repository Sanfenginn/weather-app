import { useTranslation } from "react-i18next";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

function NavBarSettingLanguageModal({ show, handleClose }) {
  const [selectedUnit, setSelectedUnit] = useState("");
  const [isClick, setIsClick] = useState(false);
  const { t, i18n } = useTranslation();

  const defaultLanguage = localStorage.getItem("defaultLanguage");

  const changeLanguage = (language) => {
    i18n.changeLanguage(language); // 切换语言的函数
  };

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
      return;
    }
    const languageCode = selectedUnit === "en-gb" ? "en-gb" : "zh-cn";
    changeLanguage(languageCode);
    setIsClick(false);
    handleClose();
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
          {t("language")}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Check
            label="English/英语"
            value="en-gb"
            name="group1"
            type="radio"
            id="radio-en-gb"
            className="mb-3 clickable-cursor"
            defaultChecked={
              defaultLanguage === "en-GB" ||
              defaultLanguage === "en-gb" ||
              defaultLanguage === "en"
            }
            onChange={handleUnitChange}
          />
          <Form.Check
            label=" 简体中文/Chinese Simplified"
            value="zh-cn"
            name="group1"
            type="radio"
            id="radio-zh-cn"
            defaultChecked={
              defaultLanguage === "zh-CN" ||
              defaultLanguage === "zh-cn" ||
              defaultLanguage === "zh"
            }
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

export default NavBarSettingLanguageModal;
