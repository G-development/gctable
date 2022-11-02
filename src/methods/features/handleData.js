import { createProps } from "../features/createProps";
import { createTotalRow } from "../features/usefulMethods";

export const returnData = (layout) => {
  // console.log("returnData", layout);

  var hc = layout.qHyperCube,
    mat = [];

  hc.qDataPages.forEach((el) => mat.push(...el.qMatrix));

  const allProps = createProps(layout);

  const headers = getHeaders(layout, allProps);

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
        gct: allProps,
      };
    }
    data.push(obj);
  }
  if (allProps.total) data.unshift(createTotalRow(data, headers));
  return { data, headers };
};

const getHeaders = (layout, allProps) => {
  var hc = layout.qHyperCube;
  var dimHeaders = hc.qDimensionInfo.map((dim, i) => {
      return {
        columnType: "dimension",
        title: dim.qFallbackTitle,
        canFilter:
          hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[17]?.qText,
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
      accessor: header.title,
      disableFilters: header.columnType == "measure" ? true : false,
      filter: "rankedMatchSorter",
      width: !isNaN(header.width) ? parseInt(header.width) : null,
      headerCSS: {
        canFilter: header?.canFilter,
        hide: header.hide,
        align: header.align,
        span: header.span,
        color: header.color,
        background: header.background,
      },
      gct: allProps,
    };
  });

  return headers;
};
