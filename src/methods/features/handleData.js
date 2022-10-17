import React from "react";
import Cell from "../react/components/Cell";

export const returnData = (layout) => {
  console.log("returnData", layout);

  var hc = layout.qHyperCube;
  var mat = hc.qDataPages[0].qMatrix;

  const headers = getHeaders(hc);

  const data = [];

  for (let i = 0; i < mat.length; i++) {
    const element = mat[i];
    var obj = {};
    for (let j = 0; j < element.length; j++) {
      const elem = element[j];
      obj["col" + j] = elem.qText;
      obj["col" + j + "nav"] = {
        navType: elem?.qAttrExps?.qValues[0]?.qText,
        navUrl: elem?.qAttrExps?.qValues[1]?.qText,
        sheet: elem?.qAttrExps?.qValues[2]?.qText,
        sel: elem?.qAttrExps?.qValues[3]?.qText,
        clear: elem?.qAttrExps?.qValues[4]?.qText,
      };
      obj["col" + j + "props"] = {
        showIF: elem?.qAttrExps?.qValues[5]?.qText,
        bgColor: elem?.qAttrExps?.qValues[6]?.qText,
        textColor: elem?.qAttrExps?.qValues[7]?.qText,
        textAlign: elem?.qAttrExps?.qValues[8]?.qText,
        textSize: elem?.qAttrExps?.qValues[9]?.qText,
        // headerAlign: elem?.qAttrExps?.qValues[10]?.qText,
      };
    }
    data.push(obj);
  }

  return { data, headers };
};

const getHeaders = (hc) => {
  var dimHeaders = hc.qDimensionInfo.map((dim, i) => {
      return {
        title: dim.qFallbackTitle,
        align: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[10]?.qText,
        width: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[11]?.qNum,
        color: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[12]?.qText,
        background:
          hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[13]?.qText,
      };
    }),
    measHeaders = hc.qMeasureInfo.map((meas, i) => {
      let j = i + hc.qDimensionInfo.length;
      return {
        title: meas.qFallbackTitle,
        align: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[10]?.qText,
        width: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[11]?.qNum,
        color: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[12]?.qText,
        background:
          hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[13]?.qText,
      };
    }),
    headerTot = dimHeaders.concat(measHeaders);

  var headers = headerTot.map((header, i) => {
    console.log(header);
    return {
      Header: header.title,
      accessor: "col" + i,
      width: parseInt(header.width),
      headerCSS: {
        align: header.align,
        color: header.color,
        background: header.background,
      },
      Cell: (props) => <Cell props={props} />,
    };
  });

  return headers;
};
