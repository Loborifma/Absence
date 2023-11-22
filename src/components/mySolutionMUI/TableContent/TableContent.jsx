import React, { Fragment, useRef, useState } from "react";

import { TableCell, TableRow } from "@mui/material";
import { substituteName } from "../Table/styles";
import BlinkCell from "../BlinkCell/BlinkCell";
import MyDialog from "../MyDialog/MyDialog";
import { getAmountOfDays } from "../../../utils/daysHelper";
import AbsenceCard from "../AbsenceCard/AbsenceCard";
import { uniqueId } from "lodash";

const TableContent = ({
  labels,
  label,
  labelIndex,
  setLabels,
  months,
  clickedDay,
  handleAddAbsencePeriod,
  handleDeleteAbsence,
  handleMouseUp,
}) => {
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const drugAbsence = useRef({});

  return (
    <TableRow sx={{ position: "relative" }}>
      <TableCell align="center" sx={substituteName}>
        {label.label}
      </TableCell>
      {months.map(({ daysOfMonth }, monthIndex) => {
        return daysOfMonth.map((day, dayIndex) => (
          <BlinkCell
            id={day.id}
            key={day.id}
            onClick={() =>
              handleAddAbsencePeriod(
                day,
                dayIndex,
                monthIndex,
                label,
                labelIndex,
                setIsOpenDialog
              )
            }
            onMouseUp={() => handleMouseUp(drugAbsence)}
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
            {label.absences.map((absence, absenceIndex) => {
              const isUserRow = labelIndex === 0;
              const { id, from: startDate, to: endDate, substitute } = absence;
              const amountOfDays = getAmountOfDays(startDate, endDate);
              const startDateUTC = new Date(startDate).setHours(0);
              const endDateUTC = new Date(endDate).setHours(0);

              let isCollision;
              if (isUserRow) {
                isCollision = !!label.absences.find(
                  (el, index) =>
                    index !== absenceIndex &&
                    new Date(el.from).setHours(0) <= startDateUTC &&
                    new Date(el.to).setHours(0) >= endDateUTC
                );
              }

              if (startDateUTC > day.date || endDateUTC < day.date) return null;
              if (startDateUTC === day.date) {
                return (
                  <AbsenceCard
                    key={id}
                    labels={labels}
                    setLabels={setLabels}
                    isCollision={isCollision}
                    absenceId={id}
                    drugAbsence={drugAbsence}
                    isUserRow={isUserRow}
                    substitute={substitute}
                    amountOfDays={amountOfDays}
                    onDeleteAbsence={(event) =>
                      handleDeleteAbsence(event, dayIndex, monthIndex, label)
                    }
                  />
                );
              }
              return <Fragment key={uniqueId()} />;
            })}
          </BlinkCell>
        ));
      })}
    </TableRow>
  );
};

export default TableContent;
