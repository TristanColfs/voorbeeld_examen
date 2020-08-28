import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { GlobalContexProvider } from "./GlobalContext";

ReactDOM.render(
  <GlobalContexProvider>
    <App />
  </GlobalContexProvider>,
  document.getElementById("root")
);
