import React from "react";
import Table from "./components/Table";
import { returnData } from "../features/handleData";

const Ext = ({ layout }) => {
  var { data, headers } = returnData(layout);
  return <Table tableData={data} headers={headers} gct={layout.GCT} />;
};

export default Ext;
