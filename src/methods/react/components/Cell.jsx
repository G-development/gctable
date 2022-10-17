import React from "react";
import { qlik } from "../../paint";

const Cell = ({ props }) => {
  let { textColor, textSize, textAlign, bgColor } = props.settings;
  return (
    <td
      onClick={() => {
        console.log("this cell:", props);
        if (
          props.nav.navType == "sheet" &&
          (props.nav?.sheet || props.nav?.sel || props.nav?.clear)
        ) {
          qlik.fun.promiseNavigationHistory(
            props.nav.clear,
            props.nav.sel,
            props.nav.sheet,
            false
          );
        } else if (props.nav.navType == "url")
          window.location.href = props.nav.navUrl;
      }}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        fontSize: textSize,
        textAlign: textAlign,
      }}
    >
      {props.value}
    </td>
  );
};

export default Cell;
