import React from "react";

import { TableHead, TableRow } from "@mui/material";
import NameHeader from "./NameHeader";
import MonthHeader from "./MonthHeader";
import DaysHeader from "./DaysHeader";
import { uniqueId } from "lodash";

const TableHeader = ({ daysInYear }) => {
  return (
    <>
      <TableHead>
        <TableRow>
          <NameHeader />
          {daysInYear.map((el) => (
            <MonthHeader key={uniqueId()} el={el} />
          ))}
        </TableRow>
        <TableRow>
          {daysInYear.map(({ days }) => {
            return days.map((el) => <DaysHeader key={el.id} el={el} />);
          })}
        </TableRow>
      </TableHead>
    </>
  );
};

export default TableHeader;
