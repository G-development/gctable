import React from "react";
import { createRoot } from "react-dom/client";
import Ext from "./react/Ext";

import "./style.css";

export var qlik = window.require("qlik");

export default function paint($element, layout) {
  console.log("Paint", layout);

  var lastrow = 0,
    me = this,
    totRows = this.backendApi.getRowCount();
  this.backendApi.eachDataRow((rownum) => (lastrow = rownum));
  var lastRowCheck = lastrow < 40000 ? true : false;

  console.log(totRows, lastrow);
  if (totRows > lastrow + 1 && lastRowCheck) {
    var requestPage = [
      {
        qTop: lastrow + 1,
        qLeft: 0,
        qWidth: 40,
        qHeight: Math.min(800, totRows - lastrow),
      },
    ];
    this.backendApi.getData(requestPage).then(function (dataPages) {
      console.log(dataPages);
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
