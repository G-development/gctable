export const createTotalRow = (data, headers) => {
  let headerAccessor = headers.map((header) => header.accessor);
  let tempObj = {};
  headerAccessor.forEach((accessor) => {
    tempObj[accessor] = {
      name: "total",
      value: getTotals(data, accessor),
      props: { textAlign: "right" },
      gct: {
        padding: "0.4rem",
        border: true,
        borderSize: "0.02em solid #f2f2f2",
      },
    };
  });

  return tempObj;
};

const getTotals = (data, key) => {
  let total = 0;
  data.forEach((item) => {
    if (!isNaN(item[key].value)) total += parseFloat(item[key].value);
  });
  if (total != 0) return total;
  else return null;
};

export const getHiddenColumns = (data) => {
  var dataDUP = data.map((e) => e),
    arr = [];
  dataDUP.length = Object.keys(data[0]).length;
  dataDUP.forEach((el) => {
    for (const [key, value] of Object.entries(el)) {
      if (value?.props?.showIF == "False") arr.push(value.name);
    }
  });
  return arr;
};

export const randomizeColumns = (setColumnOrder, visibleColumns) => {
  setColumnOrder(shuffle(visibleColumns.map((d) => d.id)));
};

function shuffle(arr) {
  arr = [...arr];
  const shuffled = [];
  while (arr.length) {
    const rand = Math.floor(Math.random() * arr.length);
    shuffled.push(arr.splice(rand, 1)[0]);
  }
  return shuffled;
}
