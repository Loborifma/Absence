import { TableCell } from "@mui/material";
import { namesHeader } from "./styles";

const NameHeader = () => {
  return (
    <TableCell align="center" rowSpan={2} sx={namesHeader}>
      <span>Name</span>
    </TableCell>
  );
};

export default NameHeader;
