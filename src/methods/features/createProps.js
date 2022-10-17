export const createProps = (layout) => {
  var gct = layout.GCT;
  var allProps = {
    /* Configuration */
    /* CSS */
    padding:
      gct.CSS.padding && gct.CSS.padding != null && gct.CSS.padding != ""
        ? gct.CSS.padding
        : "0.4rem",
    fixedHeader:
      gct.CSS.fixedHeader && gct.CSS.fixedHeader != null && gct.CSS.fixedHeader
        ? { position: "sticky", top: 0 }
        : false,
  };
  return allProps;
};
