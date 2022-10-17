import React from "react";
import Header from "../react/components/Header";
import Cell from "../react/components/Cell";
import { createProps } from "../features/createProps";

export const returnData = (layout) => {
  console.log("returnData", layout);

  var hc = layout.qHyperCube;
  var mat = hc.qDataPages[0].qMatrix;

  const headers = getHeaders(layout);

  const data = [];

  for (let i = 0; i < mat.length; i++) {
    const element = mat[i];
    var obj = {};
    for (let j = 0; j < element.length; j++) {
      const elem = element[j];
      var title = hc?.qDimensionInfo[j]?.qFallbackTitle
        ? hc?.qDimensionInfo[j]?.qFallbackTitle
        : hc?.qMeasureInfo[j - hc?.qDimensionInfo.length]?.qFallbackTitle;
      obj[title] = {
        name: title, //elem.qText,
        value: elem.qText,
        nav: {
          navType: elem?.qAttrExps?.qValues[0]?.qText,
          navUrl: elem?.qAttrExps?.qValues[1]?.qText,
          sheet: elem?.qAttrExps?.qValues[2]?.qText,
          sel: elem?.qAttrExps?.qValues[3]?.qText,
          clear: elem?.qAttrExps?.qValues[4]?.qText,
        },
        props: {
          showIF: elem?.qAttrExps?.qValues[5]?.qText,
          bgColor: elem?.qAttrExps?.qValues[6]?.qText,
          textColor: elem?.qAttrExps?.qValues[7]?.qText,
          textAlign: elem?.qAttrExps?.qValues[8]?.qText,
          textSize: elem?.qAttrExps?.qValues[9]?.qText,
        },
        gct: createProps(layout),
      };
    }
    data.push(obj);
  }
  return { data, headers };
};

const getHeaders = (layout) => {
  var hc = layout.qHyperCube;
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
    return {
      Header: (props) => <Header props={props} />, //header.title,
      accessor: header.title,
      width: !isNaN(header.width) ? parseInt(header.width) : null,
      headerCSS: {
        align: header.align,
        color: header.color,
        background: header.background,
      },
      Cell: (props) => <Cell props={props} />,
      gct: createProps(layout),
    };
  });

  return headers;
};
