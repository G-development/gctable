export const createProps = (layout) => {
  var gct = layout.GCT;
  var allProps = {
    /* Configuration */
    /* CSS */
    headerColor:
      gct.CSS.headerColor &&
      gct.CSS.headerColor != null &&
      gct.CSS.headerColor != ""
        ? gct.CSS.headerColor
        : "#f2f2f2",
    padding:
      gct.CSS.padding && gct.CSS.padding != null && gct.CSS.padding != ""
        ? gct.CSS.padding
        : "0.4rem",
    border:
      gct.CSS.border && gct.CSS.border != null && gct.CSS.border != ""
        ? gct.CSS.border
        : null,
    borderSize: gct.CSS.border
      ? gct.CSS.borderSize &&
        gct.CSS.borderSize != null &&
        gct.CSS.borderSize != ""
        ? gct.CSS.borderSize
        : "0.02em solid #f2f2f2"
      : null,
    fixedHeader:
      gct.CSS.fixedHeader && gct.CSS.fixedHeader != null && gct.CSS.fixedHeader
        ? { position: "sticky", top: 0 }
        : false,
    /* OTHER */
    customOrder:
      gct.customOrder && gct.customOrder != null && gct.customOrder
        ? gct.customOrder
        : false,
  };
  return allProps;
};
