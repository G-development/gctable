import React from "react";
import QlikFilter from "./QlikFilter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";

const Header = ({ props }) => {
  var self = props.column;
  debugger;
  return (
    <th
      role="columnheader"
      colSpan={self.headerCSS.span}
      onClick={() => {
        console.log("this header:", props);
      }}
      style={{
        display: self.headerCSS.hide == "hide" ? "none" : "",
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
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {self.id}
        {self.canFilter && (
          <>
            <Tippy
              // theme="GCTable"
              theme="light"
              content=<QlikFilter column={props.column} />
              allowHTML={true}
              interactive={true}
              interactiveBorder={20}
              delay={50}
              trigger="click"
              style={{ backgroundColor: "white" }}
            >
              <span
                className="lui-icon  lui-icon--search"
                aria-hidden="true"
                style={{ cursor: "pointer", margin: "0 10px" }}
              ></span>
            </Tippy>
          </>
        )}
      </div>
    </th>
  );
};

export default Header;
