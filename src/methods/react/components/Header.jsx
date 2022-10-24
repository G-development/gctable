import React from "react";
import { DropdownFilter, TextSearchFilter } from "../../features/filters";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

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
            <Tippy
              theme="GCTable"
              content=<DropdownFilter column={props.column} />
              allowHTML={true}
              interactive={true}
              interactiveBorder={20}
              delay={50}
              trigger="click"
              style={{ backgroundColor: "white" }}
            >
              <img
                src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-2.png"
                width="16px;"
                style={{ cursor: "pointer", margin: "0 10px;" }}
              />
            </Tippy>
          </>
        )}
      </div>
    </th>
  );
};

export default Header;
