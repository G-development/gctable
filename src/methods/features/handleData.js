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
    }
    data.push(obj);
  }

  return { data, headers };
};

const getHeaders = (hc) => {
  var dimHeaders = hc.qDimensionInfo.map((dim) => dim.qFallbackTitle),
    measHeaders = hc.qMeasureInfo.map((meas) => meas.qFallbackTitle),
    headerTot = dimHeaders.concat(measHeaders);

  var headers = headerTot.map((header, i) => {
    return {
      Header: header,
      accessor: "col" + i,
    };
  });

  return headers;
};
