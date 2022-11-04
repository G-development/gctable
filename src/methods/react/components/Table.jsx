import React, { useMemo } from "react";
import {
  useTable,
  useColumnOrder,
  useFilters,
  usePagination,
} from "react-table";
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
        pageIndex: 0,
      },
    },
    useColumnOrder,
    useFilters,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  } = tableInstance;

  return (
    <>
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
          {page.map((row, i) => {
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
      <div className="pagination">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span>
          | Go to page:{" "}
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Table;
