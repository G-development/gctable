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
          replaceIF: elem?.qAttrExps?.qValues[14]?.qText,
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
        columnType: "dimension",
        title: dim.qFallbackTitle,
        hide: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[15]?.qText,
        align: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[10]?.qText,
        span: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[16]?.qNum,
        width: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[11]?.qNum,
        color: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[12]?.qText,
        background:
          hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[13]?.qText,
        replaceIF:
          hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[14]?.qText,
      };
    }),
    measHeaders = hc.qMeasureInfo.map((meas, i) => {
      let j = i + hc.qDimensionInfo.length;
      return {
        columnType: "measure",
        title: meas.qFallbackTitle,
        hide: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[15]?.qText,
        align: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[10]?.qText,
        span: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[16]?.qNum,
        width: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[11]?.qNum,
        color: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[12]?.qText,
        background:
          hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[13]?.qText,
        replaceIF:
          hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[14]?.qText,
      };
    }),
    headerTot = dimHeaders.concat(measHeaders);

  var headers = headerTot.map((header) => {
    return {
      Header: (props) => <Header props={props} />,
      accessor: header.title,
      Cell: (props) => <Cell props={props} />,
      disableFilters: header.columnType == "measure" ? true : false,
      // Filter: DropdownFilter,
      filter: "rankedMatchSorter",
      width: !isNaN(header.width) ? parseInt(header.width) : null,
      headerCSS: {
        hide: header.hide,
        align: header.align,
        span: header.span,
        color: header.color,
        background: header.background,
      },
      gct: createProps(layout),
    };
  });

  return headers;
};
