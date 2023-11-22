import { TableCell } from "@mui/material";
import { daysHeader } from "./styles";
import { useLayoutEffect, useRef } from "react";

const DaysHeader = ({ dayOfMonth, currentDay }) => {
  const today = useRef(new Date().setHours(0, 0, 0, 0));

  useLayoutEffect(() => {
    if (dayOfMonth.date === today.current) {
      currentDay.current = dayOfMonth.id;
    }
  }, [currentDay, dayOfMonth.id, dayOfMonth.date]);

  return (
    <TableCell
      id={dayOfMonth.id}
      className="days_header"
      align="center"
      size="small"
      sx={{
        ...daysHeader,
        backgroundColor:
          dayOfMonth.date === today.current && "rgba(128, 163, 216, 0.523)",
      }}
    >
      <div>{dayOfMonth.day.split(" ")[0]}</div>
      <div>{dayOfMonth.day.split(" ")[1]}</div>
    </TableCell>
  );
};

export default DaysHeader;
