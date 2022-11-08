import React from "react";
import { createRoot } from "react-dom/client";
import Ext from "./react/Ext";

import "./style.css";

export var qlik = window.require("qlik");

export default function paint($element, layout) {
  // console.log("Paint", layout);
  var lastrow = 0,
    me = this;

  this.backendApi.eachDataRow((rownum) => (lastrow = rownum));
  // console.log("Tot rows", this.backendApi.getRowCount());
  // console.log("lastrow", lastrow);

  if (this.backendApi.getRowCount() > lastrow + 1 && lastrow < 5000) {
    var requestPage = [
      {
        qTop: lastrow + 1,
        qLeft: 0,
        qWidth: layout.qHyperCube.qSize.qcx, //40,
        qHeight: Math.min(
          10000 / layout.qHyperCube.qSize.qcx, //1000
          this.backendApi.getRowCount() - lastrow
        ),
      },
    ];
    this.backendApi.getData(requestPage).then(function (dataPages) {
      me.paint($element, layout);
    });
  }

  if (!this.$scope.root) {
    const container = document.getElementById("GC-Table_" + layout.qInfo.qId);
    const root = createRoot(container);
    this.$scope.root = root;
  }
  this.$scope.root.render(<Ext layout={layout} />);
}
