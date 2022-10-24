import React from "react";
import { createRoot } from "react-dom/client";

import Ext from "./react/Ext";

import "./style.css";
import "leonardo-ui";

export var qlik = window.require("qlik");

export default function paint($element, layout) {
  if (!this.$scope.root) {
    const container = document.getElementById("GC-Table_" + layout.qInfo.qId);
    const root = createRoot(container);
    this.$scope.root = root;
  }
  this.$scope.root.render(<Ext layout={layout} />);
}
