import { TableCell } from "@mui/material";
import React from "react";

// import cl from "./BlinkCell.module.css";

const BlinkCell = React.memo(({ children, handleClick, amountOfDays }) => {
  return (
    <TableCell
      sx={{
        position: amountOfDays === 1 && "relative",
        height: 50,
        borderRight: "1px solid grey",
        paddingBottom: 0,
        paddingRight: 1,
        paddingLeft: 1,
      }}
      onClick={handleClick}
    >
      {children}
    </TableCell>
  );
});

export default BlinkCell;
