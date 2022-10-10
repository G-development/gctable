import React from "react";
import Table from "./components/Table";
import { returnData } from "../features/handleData";

const Ext = ({ layout, element }) => {
  var { data, headers } = returnData(layout);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Vis: {layout.visualization}</h1>
      <Table tableData={data} headers={headers} />
    </>
  );
};

export default Ext;
