import React, { useMemo } from "react";
import { useTable, useColumnOrder, useFilters } from "react-table";
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
    useFilters
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => {
              return <Header {...column.getHeaderProps()} props={column} />;
            })}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <Cell {...cell.getCellProps()} props={cell} />;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Table;
