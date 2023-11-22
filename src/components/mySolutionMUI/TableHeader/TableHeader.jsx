import React from "react";

import { TableCell, TableHead, TableRow } from "@mui/material";
import MonthHeader from "./MonthHeader";
import DaysHeader from "./DaysHeader";
import { uniqueId } from "lodash";
import { namesHeader } from "./styles";

const TableHeader = ({ months, currentDay }) => {
  return (
    <TableHead>
      <TableRow>
        <TableCell align="center" rowSpan={2} sx={namesHeader}>
          <span>Name</span>
        </TableCell>
        {months.map((month) => (
          <MonthHeader key={uniqueId()} month={month} />
        ))}
      </TableRow>
      <TableRow>
        {months.map(({ daysOfMonth }) => {
          return daysOfMonth.map((dayOfMonth) => (
            <DaysHeader
              key={dayOfMonth.id}
              dayOfMonth={dayOfMonth}
              currentDay={currentDay}
            />
          ));
        })}
      </TableRow>
    </TableHead>
  );
};

export default TableHeader;
