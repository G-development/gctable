import React, { useMemo, useState } from "react";
import { useTable, useColumnOrder } from "react-table";
import { randomizeColumns } from "../../features/usefulMethods";

import { qlik } from "../../paint";

const Table = ({ tableData, headers }) => {
  // console.log("tableData", tableData, "headers", headers);

  var hiddenColumns = tableData.map((el, i) => {
    if (el["col" + i + "props"]?.showIF == "False") return "col" + i;
  });

  const [selectedId, setSelectedId] = useState(-1);
  const [column, setColumn] = useState(-1);
  // const [cellValue, setCellValue] = useState("red");

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
    //
    visibleColumns,
    setColumnOrder,
  } = tableInstance;

  const getCellValue = (e, j) => {
    console.log("this cell:", e);

    // Get nav props
    e.nav = e.row.original[e.column.id + "nav"];
    e.props = e.row.original[e.column.id + "props"];

    // Navigates
    if (e.nav?.sheet || e.nav?.sel || e.nav?.clear) {
      qlik.fun.promiseNavigationHistory(
        e.nav.clear,
        e.nav.sel,
        e.nav.sheet,
        false
      );
    }

    setSelectedId(e.row.id);
    setColumn(j);
  };

  return (
    <>
      <button onClick={() => randomizeColumns(setColumnOrder, visibleColumns)}>
        Randomize Columns
      </button>
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
                    <th {...column.getHeaderProps()}>
                      {
                        // Render the header
                        column.render("Header")
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
                  {
                    // Loop over the rows cells
                    row.cells.map((cell, j) => {
                      // Apply the cell props
                      return (
                        <td
                          onClick={() => getCellValue(cell, j)}
                          {...cell.getCellProps()}
                        >
                          {
                            // Render the cell contents
                            cell.render(
                              "Cell" /*, {nav: cell.row.original[cell.column.id + "nav"]}*/
                            )
                          }
                        </td>
                      );
                    })
                  }
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
