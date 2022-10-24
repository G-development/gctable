import React from "react";
import { DropdownFilter, TextSearchFilter } from "../../features/filters";

const Header = ({ props }) => {
  var self = props.column;
  return (
    <div
      {...self.getHeaderProps()}
      onClick={() => {
        console.log("this header:", props);
      }}
      style={{
        role: "columnheader",
        colspan: "1",
        width: self.width,
        textAlign: self.headerCSS.align,
        color: self.headerCSS.color,
        backgroundColor: self.headerCSS.background
          ? self.headerCSS.background
          : self.gct.headerColor,
        padding: self.gct.padding,
        position: self.gct.fixedHeader.position,
        top: self.gct.fixedHeader.top,
        border: self.gct.borderSize,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        {self.id}
        {self.canFilter && (
          <>
            <img
              src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
              width="16px;"
              style={{ cursor: "pointer" }}
            />
            <DropdownFilter column={props.column} />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
