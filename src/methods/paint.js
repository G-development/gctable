import React from "react";
import { createRoot } from "react-dom/client";
import Ext from "./react/Ext";

import "./style.css";

var qlik = window.require("qlik");

export default function paint($element, layout) {
  console.log("Layout", layout);

  const container = document.getElementById("GC-Table_" + layout.qInfo.qId);
  const root = createRoot(container);
  root.render(<Ext layout={layout} element={$element} />);
}
