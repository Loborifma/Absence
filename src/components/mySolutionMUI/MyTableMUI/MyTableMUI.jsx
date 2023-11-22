import React from "react";

import cl from "./MyTableMUI.module.css";
import Table from "../Table/Table";

const MyTableMUI = () => {
  return (
    <div className={cl.my_table_mui}>
      <Table />
    </div>
  );
};

export default MyTableMUI;
