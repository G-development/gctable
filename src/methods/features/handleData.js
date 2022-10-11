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
        headerAlign: elem?.qAttrExps?.qValues[10]?.qText,
      };
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
      Cell: (props) => {
        // debugger;
        return props.value;
      },
    };
  });

  return headers;
};
