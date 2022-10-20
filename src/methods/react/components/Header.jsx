import React from "react";

// <th colspan="1" role="columnheader" style="text-align: center; background-color: rgb(92, 235, 232);">Sum(SPT_Size)</th>

const Header = ({ props }) => {
  var self = props.column;
  return (
    <th
      onClick={() => {
        console.log("this header:", props);
      }}
      style={{
        role: "columnheader",
        colspan: "1",
        width: self.width,
        textAlign: self.headerCSS.align,
        color: self.headerCSS.color,
        backgroundColor: self.headerCSS.background,
        padding: self.gct.padding,
        position: self.gct.fixedHeader.position,
        top: self.gct.fixedHeader.top,
        border: self.gct.borderSize,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {props.column.id}
        <img
          src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
          width="16px;"
          style={{ cursor: "pointer" }}
        />
      </div>
    </th>
  );
};

export default Header;
