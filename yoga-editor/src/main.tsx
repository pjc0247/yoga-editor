import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { configure } from "mobx";

import "react-contexify/dist/ReactContexify.css";

configure({
  enforceActions: "never",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
