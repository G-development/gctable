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
