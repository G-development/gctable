import React, { useMemo } from "react";
import { useTable, useColumnOrder } from "react-table";
import {
  getHiddenColumns,
  //randomizeColumns,
} from "../../features/usefulMethods";

const Table = ({ tableData, headers, gct }) => {
  // console.log("tableData", tableData, "headers", headers, "gct", gct);

  const data = React.useMemo(() => tableData, [tableData]);
  const columns = React.useMemo(() => headers, [headers]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: getHiddenColumns(tableData),
        columnOrder: eval(gct.customOrder),
      },
    },
    useColumnOrder
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // visibleColumns,
    // setColumnOrder,
  } = tableInstance;

  return (
    <>
      {/* <button
        onClick={() => {
          setColumnOrder(eval(gct.customOrder));
          // return randomizeColumns(setColumnOrder, visibleColumns);
        }}
      >
        Randomize Columns
      </button> */}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => {
                  return column.render("Header");
                })}
              </tr>
            ))
          }
        </thead>
        {/* Apply the table body props */}
        <tbody {...getTableBodyProps()}>
          {
            // Loop over the table rows
            rows.map((row) => {
              // Prepare the row for display
              prepareRow(row);
              return (
                // Apply the row props
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return cell.render("Cell");
                  })}
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </>
  );
};

export default Table;
