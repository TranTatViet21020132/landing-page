import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import './assets/fonts/Magistral/Magistral-Bold.ttf';
import './assets/fonts/Sarabun/Sarabun-Regular.ttf';
import './assets/fonts/PFBeauSansPro/PFBeauSansPro-Bold.ttf';
import i18nTranslation from "./configs/i18n";

const App = React.lazy(async () => {
  await Promise.all([
    i18nTranslation.initialize(),
  ]);
  return import("./App");
});

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
