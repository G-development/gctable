import React from "react";
import { qlik } from "../../paint";

const Cell = ({ props }) => {
  var self = props.value;
  var total = self.name === "total" ? true : false;
  let { textColor, textSize, textAlign, bgColor, replaceIF } = self.props
    ? self.props
    : "";

  return (
    <div
      className="td"
      onClick={() => {
        console.log("this cell:", props);
        if (
          self?.nav?.navType == "sheet" &&
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
        backgroundColor: self.value === "-" ? "#F2F2F2" : bgColor,
        fontSize: textSize,
        textAlign: self.value === "-" ? "left" : textAlign,
        padding: self?.gct?.padding,
        border: self?.gct?.borderSize,
        textOverflow: "ellipsis",
        // minWidth: "50px",
        // maxWidth: "50px",
        width: props.column.width,
        overflowX: "hidden",
      }}
    >
      {replaceIF == undefined || self.value === "-" ? (
        <abbr
          title={self.value}
          style={{ textDecoration: "none", whiteSpace: "nowrap" }}
        >
          {total ? <b>{self.value}</b> : self.value}
        </abbr>
      ) : (
        <abbr title={self.value}>
          <span
            style={{ display: "inline" }}
            dangerouslySetInnerHTML={{ __html: replaceIF }}
          />
        </abbr>
      )}
    </div>
  );
};

export default Cell;
