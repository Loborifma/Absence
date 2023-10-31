import React from "react";

import cl from "./MyTableMUI.module.css";
import DaysPart from "../DaysPart";

const MyTableMUI = () => {
  return (
    <div className={cl.my_table_mui}>
      <DaysPart />
    </div>
  );
};

export default MyTableMUI;
