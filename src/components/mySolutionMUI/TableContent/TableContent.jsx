import React, { useState } from "react";

import { TableCell, TableRow } from "@mui/material";
import { substituteName } from "../DaysPart/styles";
import BlinkCell from "../BlinkCell/BlinkCell";
import { uniqueId } from "lodash";
import MyDialog from "../MyDialog/MyDialog";
import AbsencePeriods from "../DaysPart/AbsencePeriods";
import { getAmountOfDays } from "../../../utils/daysHelper";

const TableContent = ({
  label,
  labelIndex,
  months,
  labels,
  clickedDay,
  setLabels,
  handleAddAbsencePeriod,
  handleDeleteAbsence,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  return (
    <TableRow sx={{ position: "relative" }}>
      <TableCell align="center" sx={substituteName}>
        {label.label}
      </TableCell>
      {months.map(({ daysOfMonth }, monthIndex) => {
        return daysOfMonth.map((day, dayIndex) => (
          <BlinkCell
            id={labelIndex === 0 ? day.id : uniqueId()}
            key={day.id}
            handleClick={() =>
              handleAddAbsencePeriod(
                day,
                dayIndex,
                monthIndex,
                label,
                labelIndex,
                setIsOpenDialog
              )
            }
          >
            {clickedDay.current?.date === day.date && labelIndex === 0 && (
              <MyDialog
                clickedDay={clickedDay.current.date}
                isOpen={isOpenDialog}
                setIsOpen={setIsOpenDialog}
                label={label}
                setLabels={setLabels}
                substitutes={labels}
              />
            )}
            {label.absences.map((absence) => {
              const { id, from: startDate, to: endDate, substitute } = absence;
              const amountOfDays = getAmountOfDays(startDate, endDate);

              return (
                <AbsencePeriods
                  key={id}
                  startDate={startDate}
                  endDate={endDate}
                  substitute={substitute}
                  amountOfDays={amountOfDays}
                  date={day.date}
                  dayIndex={dayIndex}
                  monthIndex={monthIndex}
                  handleDeleteAbsence={(event) =>
                    handleDeleteAbsence(event, dayIndex, monthIndex, label)
                  }
                />
              );
            })}
          </BlinkCell>
        ));
      })}
    </TableRow>
  );
};

export default TableContent;
