import { TableCell } from "@mui/material";
import { daysHeader } from "./styles";

const DaysHeader = ({ el }) => {
  return (
    <TableCell align="center" size="small" sx={daysHeader}>
      <div>{el.day.split(" ")[0]}</div>
      <div>{el.day.split(" ")[1]}</div>
    </TableCell>
  );
};

export default DaysHeader;
