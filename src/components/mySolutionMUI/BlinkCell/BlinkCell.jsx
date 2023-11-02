import { TableCell } from "@mui/material";
import React from "react";

// import cl from "./BlinkCell.module.css";

const BlinkCell = React.memo(({ children, handleClick }) => {
  return (
    <TableCell
      sx={{
        height: 50,
        borderRight: "1px solid grey",
        paddingBottom: 0,
        paddingRight: 0,
        paddingLeft: 0,
      }}
      onClick={handleClick}
    >
      {children}
    </TableCell>
  );
});

export default BlinkCell;
