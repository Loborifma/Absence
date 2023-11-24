import { TableCell } from "@mui/material";
import React from "react";

const BlinkCell = ({ children, onClick, onMouseUp, id }) => {
  return (
    <TableCell
      id={id}
      sx={{
        height: 50,
        borderRight: "1px solid grey",
        paddingBottom: 0,
        paddingRight: 1,
        paddingLeft: 1,
      }}
      onMouseUp={onMouseUp}
      onClick={onClick}
    >
      {children}
    </TableCell>
  );
};

export default BlinkCell;
