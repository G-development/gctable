import React, { useMemo, useState } from "react";
import { useTable, useColumnOrder } from "react-table";
import { randomizeColumns } from "../../features/usefulMethods";

const Table = ({ tableData, headers }) => {
  // console.log("tableData", tableData, "headers", headers);

  var hiddenColumns = tableData.map((el, i) => {
    if (el["col" + i + "props"]?.showIF == "False") return "col" + i;
  });

  const data = React.useMemo(() => tableData, [tableData]);
  const columns = React.useMemo(() => headers, [headers]);
  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: {
        hiddenColumns: hiddenColumns,
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
      {/* <button onClick={() => randomizeColumns(setColumnOrder, visibleColumns)}>
        Randomize Columns
      </button> */}
      <table {...getTableProps()}>
        <thead>
          {
            // Loop over the header rows
            headerGroups.map((headerGroup) => (
              // Apply the header row props
              <tr {...headerGroup.getHeaderGroupProps()}>
                {
                  // Loop over the headers in each row
                  headerGroup.headers.map((column) => (
                    // Apply the header cell props
                    <th
                      {...column.getHeaderProps({
                        style: {
                          textAlign: column.headerCSS.align,
                          color: column.headerCSS.color,
                          backgroundColor: column.headerCSS.background,
                        },
                      })}
                    >
                      {
                        column.render("Header") // Render the header
                      }
                    </th>
                  ))
                }
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
                    return cell.render("Cell", {
                      nav: cell.row.original[cell.column.id + "nav"],
                      settings: cell.row.original[cell.column.id + "props"],
                    });
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
