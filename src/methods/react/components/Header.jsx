import React from "react";

// <th colspan="1" role="columnheader" style="text-align: center; background-color: rgb(92, 235, 232);">Sum(SPT_Size)</th>

const Header = ({ props }) => {
  return (
    <th
      onClick={() => {
        console.log("this cell:", props);
      }}
      style={{
        role: "columnheader",
        colspan: "1",
        width: props.column.width,
        textAlign: props.column.headerCSS.align,
        color: props.column.headerCSS.color,
        backgroundColor: props.column.headerCSS.background,
        padding: props.column.gct.padding,
        position: props.column.gct.fixedHeader.position,
        top: props.column.gct.fixedHeader.top,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {props.column.id}
        <img
          src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
          width="16px;"
        />
      </div>
    </th>
  );
};

export default Header;
