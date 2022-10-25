import React from "react";
import { qlik } from "../../paint";

const Cell = ({ props }) => {
  var self = props.value;
  let { textColor, textSize, textAlign, bgColor, replaceIF } = self.props;

  return (
    <td
      onClick={() => {
        console.log("this cell:", props);
        if (
          self?.nav.navType == "sheet" &&
          (self?.nav?.sheet || self?.nav?.sel || self?.nav?.clear)
        ) {
          qlik.fun.promiseNavigationHistory(
            self?.nav.clear,
            self?.nav.sel,
            self?.nav.sheet,
            false
          );
        } else if (self?.nav.navType == "url")
          window.location.href = self?.nav.navUrl;
      }}
      style={{
        color: textColor,
        backgroundColor: bgColor,
        fontSize: textSize,
        textAlign: textAlign,
        padding: self.gct.padding,
        border: self.gct.borderSize,
        textOverflow: "ellipsis",
        maxWidth: "50px",
        overflowX: "hidden",
      }}
    >
      {replaceIF == undefined ? (
        <abbr
          title={self.value}
          style={{ textDecoration: "none", whiteSpace: "nowrap" }}
        >
          {self.value}
        </abbr>
      ) : (
        <span
          style={{ display: "inline" }}
          dangerouslySetInnerHTML={{ __html: replaceIF }}
        />
      )}
    </td>
  );
};

export default Cell;
