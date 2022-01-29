import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configure } from "mobx";

configure({
  enforceActions: "never",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
