import { TableCell } from "@mui/material";
import { Fragment } from "react";
import { monthHeader } from "./styles";

const MonthHeader = ({ el }) => {
  return (
    <Fragment>
      <TableCell colSpan={2} size="small" sx={monthHeader}>
        {el.formattedMonth}
      </TableCell>
      <TableCell sx={{ height: 5 }} colSpan={el.daysOfMonth.length - 2} />
    </Fragment>
  );
};

export default MonthHeader;
