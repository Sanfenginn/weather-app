import "./index.scss";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "../src/components/App/App";
// import "primereact/resources/themes/saga-blue/theme.css"; // theme
// import "primereact/resources/primereact.min.css"; // PrimeReact Core CSS Files
// import "primeicons/primeicons.css"; // PrimeIcons
import "./fontawesome.js"; // 引入 Font Awesome 配置
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import { store, persistor } from "../src/components/Redux/store";
import { PersistGate } from "redux-persist/integration/react";
import "./i18n.js"; // 引入i18n配置

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
  // <React.StrictMode>
  // </React.StrictMode>
);
