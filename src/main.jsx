import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./main.css";
import CadetDetailsProvider from "./store/CadetProvider.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <CadetDetailsProvider>
    <App />
  </CadetDetailsProvider>
);
