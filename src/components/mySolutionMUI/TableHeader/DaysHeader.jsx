import { TableCell } from "@mui/material";
import { daysHeader } from "./styles";
import { useLayoutEffect, useRef } from "react";

const DaysHeader = ({ el, currentDay }) => {
  const today = useRef(new Date().setHours(0, 0, 0, 0));

  useLayoutEffect(() => {
    if (el.date === today.current) {
      currentDay.current = el.id;
    }
  }, [currentDay, el.id, el.date]);

  return (
    <TableCell
      id={el.id}
      className="days_header"
      align="center"
      size="small"
      sx={{
        ...daysHeader,
        backgroundColor:
          el.date === today.current && "rgba(128, 163, 216, 0.523)",
      }}
    >
      <div>{el.day.split(" ")[0]}</div>
      <div>{el.day.split(" ")[1]}</div>
    </TableCell>
  );
};

export default DaysHeader;
