import { createProps } from "../features/createProps";
import { createTotalRow } from "../features/usefulMethods";

export const returnData = (layout) => {
  // console.log("returnData", layout);

  var hc = layout.qHyperCube,
    mat = [];

  hc.qDataPages.forEach((el) => mat.push(...el.qMatrix));

  const allProps = createProps(layout);

  const headers = getHeaders(layout, allProps);

  var clearDims = hc.qDimensionInfo.filter((d) =>
      d.hasOwnProperty("qFallbackTitle")
    ),
    clearMeas = hc.qMeasureInfo.filter((d) =>
      d.hasOwnProperty("qFallbackTitle")
    );
  const data = [];

  for (let i = 0; i < mat.length; i++) {
    const element = mat[i];
    var obj = {};
    for (let j = 0; j < element.length; j++) {
      const elem = element[j];

      var title = clearDims[j]?.qFallbackTitle
        ? clearDims[j].qFallbackTitle
        : clearMeas[j - clearDims.length].qFallbackTitle;

      obj[title] = {
        name: title, //elem.qText,
        value: elem.qText,
        nav: {
          navType: elem?.qAttrExps?.qValues[0]?.qText,
          navUrl: elem?.qAttrExps?.qValues[1]?.qText,
          sheet: elem?.qAttrExps?.qValues[2]?.qText,
          sel: elem?.qAttrExps?.qValues[3]?.qText
            ? elem?.qAttrExps?.qValues[3]?.qText
            : clearDims[j]?.qGroupFieldDefs[0] + //layout.qHyperCube?.qDimensionInfo[j]?.qGroupFieldDefs[0] +
              ";" +
              elem.qText,
          clear: elem?.qAttrExps?.qValues[4]?.qText,
        },
        props: {
          bgColor: elem?.qAttrExps?.qValues[5]?.qText,
          textColor: elem?.qAttrExps?.qValues[6]?.qText,
          textAlign: elem?.qAttrExps?.qValues[7]?.qText,
          textSize: elem?.qAttrExps?.qValues[8]?.qText,
          replaceIF: elem?.qAttrExps?.qValues[13]?.qText,
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

  let hiddenDimCounter = 0;
  var dimHeaders = hc.qDimensionInfo
    .filter((d) => d.hasOwnProperty("qFallbackTitle"))
    .map((dim, i) => {
      if (dim.hasOwnProperty("qFallbackTitle")) {
        return {
          columnType: "dimension",
          title: dim.qFallbackTitle,
          canFilter:
            hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[16]?.qText,
          hide: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[14]?.qText,
          align: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[9]?.qText,
          span: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[15]?.qNum,
          width: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[10]?.qNum,
          color: hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[11]?.qText,
          background:
            hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[12]?.qText,
          replaceIF:
            hc.qDataPages[0]?.qMatrix[0][i]?.qAttrExps?.qValues[13]?.qText,
        };
      } else hiddenDimCounter++;
    })
    .filter((dim) => dim != undefined);

  var measHeaders = hc.qMeasureInfo
    .filter((d) => d.hasOwnProperty("qFallbackTitle"))
    .map((meas, i) => {
      if (meas.hasOwnProperty("qFallbackTitle")) {
        let j = i + hc.qDimensionInfo.length - hiddenDimCounter;
        return {
          columnType: "measure",
          title: meas.qFallbackTitle,
          hide: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[14]?.qText,
          align: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[9]?.qText,
          span: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[15]?.qNum,
          width: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[10]?.qNum,
          color: hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[11]?.qText,
          background:
            hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[12]?.qText,
          replaceIF:
            hc.qDataPages[0]?.qMatrix[0][j]?.qAttrExps?.qValues[13]?.qText,
        };
      }
    })
    .filter((meas) => meas != undefined);

  var headerTot = dimHeaders.concat(measHeaders);
  // console.log("header infos", headerTot);

  var headers = headerTot.map((header) => {
    return {
      accessor: header.title,
      disableFilters: header.columnType == "measure" ? true : false,
      filter: "rankedMatchSorter",
      width: !isNaN(header.width) ? parseInt(header.width) : 150,
      minWidth: 30,
      maxWidth: !isNaN(header.width) ? parseInt(header.width) : 150,
      headerCSS: {
        canFilter: header?.canFilter,
        hide: header.hide,
        align: header.align,
        span: header.span,
        color: header.color,
        background: header.background,
        // minWidth: 50,
      },
      gct: allProps,
    };
  });

  return headers;
};
