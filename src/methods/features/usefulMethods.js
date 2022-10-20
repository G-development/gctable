export const getHiddenColumns = (data) => {
  var dataDUP = data.map((e) => e),
    arr = [];
  dataDUP.length = Object.keys(data[0]).length;
  dataDUP.forEach((el) => {
    for (const [key, value] of Object.entries(el)) {
      if (value.props.showIF == "False") arr.push(value.name);
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
