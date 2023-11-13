import React from "react";

import { TableHead, TableRow } from "@mui/material";
import NameHeader from "./NameHeader";
import MonthHeader from "./MonthHeader";
import DaysHeader from "./DaysHeader";
import { uniqueId } from "lodash";

const TableHeader = ({ months }) => {
  return (
    <TableHead>
      <TableRow>
        <NameHeader />
        {months.map((el) => (
          <MonthHeader key={uniqueId()} el={el} />
        ))}
      </TableRow>
      <TableRow>
        {months.map(({ daysOfMonth }) => {
          return daysOfMonth.map((el) => <DaysHeader key={el.id} el={el} />);
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
