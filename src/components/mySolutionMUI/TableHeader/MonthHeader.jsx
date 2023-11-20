import { TableCell } from "@mui/material";
import { Fragment } from "react";
import { monthHeader } from "./styles";

const MonthHeader = ({ month }) => {
  return (
    <Fragment>
      <TableCell colSpan={2} size="small" sx={monthHeader}>
        {month.formattedMonth}
      </TableCell>
      <TableCell sx={{ height: 5 }} colSpan={month.daysOfMonth.length - 2} />
    </Fragment>
  );
};

export default MonthHeader;
