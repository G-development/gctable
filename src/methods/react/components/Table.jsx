import React, { useMemo } from "react";
import {
  useTable,
  useColumnOrder,
  useFilters,
  useBlockLayout,
} from "react-table";
import { FixedSizeList } from "react-window";
import { getHiddenColumns } from "../../features/usefulMethods";
import { matchSorterFn } from "../../features/sorting";

import Header from "./Header";
import Cell from "./Cell";

const Table = ({ tableData, headers, gct }) => {
  // console.log("tableData", tableData, "headers", headers, "gct", gct);

  const data = useMemo(() => tableData, [tableData]);
  const columns = useMemo(() => headers, [headers]);
  const defaultColumn = useMemo(() => ({ Filter: "" }), []);
  const filterTypes = useMemo(() => ({ rankedMatchSorter: matchSorterFn }), []);
  const tableInstance = useTable(
    {
      columns,
      data,
      defaultColumn,
      filterTypes,
      initialState: {
        hiddenColumns: getHiddenColumns(tableData),
        columnOrder: eval(gct.customOrder),
      },
    },
    useColumnOrder,
    useFilters,
    useBlockLayout
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    totalColumnsWidth,
  } = tableInstance;

  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index];
      prepareRow(row);
      return (
        <div {...row.getRowProps({ style })} className="tr">
          {row.cells.map((cell) => {
            return (
              <Cell {...cell.getCellProps()} props={cell} />
            );
          })}
        </div>
      );
    },
    [prepareRow, rows]
  );

  return (
    <div {...getTableProps()} className="table">
      <div className="thead">
        {headerGroups.map((headerGroup) => (
          <div {...headerGroup.getHeaderGroupProps()} className="tr">
            {headerGroup.headers.map((column) => {
              return <Header {...column.getHeaderProps()} props={column} />;
            })}
          </div>
        ))}
      </div>
      <div {...getTableBodyProps()} className="tbody">
        <FixedSizeList
          height={$("#GC-Table_" + gct.qInfo.qId).height() - 35}
          itemCount={rows.length}
          itemSize={35}
          width={totalColumnsWidth}
          className="virtualizedRows"
          zIndex={1}
        >
          {RenderRow}
        </FixedSizeList>
      </div>
    </div>
  );
};

export default Table;
