import React from "react";
import QlikFilter from "./QlikFilter";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional
import "tippy.js/themes/light.css";

const Header = ({ props }) => {
  return (
    <div
      className="th"
      role="columnheader"
      colSpan={props.headerCSS.span != NaN ? props.headerCSS.span : 1}
      onClick={() => {
        console.log("this header:", props);
      }}
      style={{
        display: props.headerCSS.hide == "hide" ? "none" : "",
        width: props.width,
        textAlign: props.headerCSS.align,
        color: props.headerCSS.color,
        backgroundColor: props.headerCSS.background
          ? props.headerCSS.background
          : props.gct.headerColor,
        padding: props.gct.padding,
        position: props.gct.fixedHeader.position,
        top: props.gct.fixedHeader.top,
        border: props.gct.borderSize,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {props.id}
        {props.canFilter && props.headerCSS.canFilter == "yes" && (
          <>
            <Tippy
              // theme="GCTable"
              theme="light"
              content=<QlikFilter column={props} />
              allowHTML={true}
              interactive={true}
              interactiveBorder={20}
              delay={50}
              trigger="click"
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
    </div>
  );
};

export default Header;
