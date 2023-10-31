import React, { useState } from "react";

import cl from "./DaysPart.module.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { getLabels } from "../../../utils/data";
import { uniqueId } from "lodash";
import { getDaysInMonth } from "../../../utils/getDays";
import BlinkCell from "../BlinkCell/BlinkCell";
import AbsenceCard from "../AbsenceCard/AbsenceCard";
import MyDialog from "../MyDialog/MyDialog";

const DaysPart = () => {
  const [labels] = useState(getLabels());
  const [daysInYear] = useState([getDaysInMonth(new Date().getFullYear(), 10)]);
  const [absences, setAbsences] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);

  const handleAddAbsencePeriod = (dayIndex, monthIndex, labelIndex) => {
    if (labelIndex !== 0) return;

    const targetDay = daysInYear[monthIndex].days[dayIndex].day;

    if (absences.find((absence) => absence.from === targetDay)) return;

    setIsOpenDialog(true);
    setAbsences((prevValue) => [
      ...prevValue,
      { from: targetDay, to: targetDay },
    ]);
  };

  const handleDeleteAbsence = (dayIndex, monthIndex) => {
    const targetDay = daysInYear[monthIndex].days[dayIndex].day;

    const indexOfTargetAbsence = absences.findIndex(
      (absence) => absence.from === targetDay
    );

    setAbsences((prevAbsences) =>
      prevAbsences.toSpliced(indexOfTargetAbsence, 1)
    );
  };

  return (
    <div className={cl.days_part}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell
              align="center"
              rowSpan={2}
              sx={{
                borderBottom: "1px solid black",
                borderRight: "1px solid black",
                minWidth: 400,
                left: 0,
                zIndex: 3,
              }}
            >
              <span>Label</span>
            </TableCell>
            {daysInYear.map((el) => (
              <React.Fragment key={uniqueId()}>
                <TableCell
                  colSpan={2}
                  size="small"
                  sx={{
                    left: 435,
                    zIndex: 3,
                    borderBottom: "1px solid grey",
                  }}
                >
                  {el.formattedMonth}
                </TableCell>
                <TableCell
                  sx={{ height: 5 }}
                  colSpan={el.days.length - 2}
                ></TableCell>
              </React.Fragment>
            ))}
          </TableRow>
          <TableRow>
            {daysInYear.map(({ days }) => {
              return days.map((el) => (
                <TableCell
                  key={el.id}
                  align="center"
                  size="small"
                  sx={{
                    borderBottom: "1px solid black",
                    borderRight: "1px solid grey",
                    borderTop: "1px solid grey",
                    minWidth: 75,
                    top: 37,
                  }}
                >
                  <div>{el.day.split(" ")[0]}</div>
                  <div>{el.day.split(" ")[1]}</div>
                </TableCell>
              ));
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {labels.map((el, labelIndex) => (
            <TableRow key={el.id}>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "white",
                  borderRight: "1px solid grey",
                  position: "sticky",
                  left: 0,
                }}
              >
                {el.label}
              </TableCell>
              {daysInYear.map(({ days }, monthIndex) => {
                return days.map((elDay, dayIndex) => (
                  <BlinkCell
                    key={uniqueId()}
                    handleClick={() =>
                      handleAddAbsencePeriod(dayIndex, monthIndex, labelIndex)
                    }
                  >
                    {absences.find(
                      (absence) => absence["from"] === elDay.day
                    ) &&
                      labelIndex === 0 && (
                        <>
                          <MyDialog
                            isOpen={isOpenDialog}
                            setIsOpen={setIsOpenDialog}
                          />
                          <AbsenceCard
                            onAddSubstitute
                            onDeleteAbsence={() =>
                              handleDeleteAbsence(dayIndex, monthIndex)
                            }
                          />
                        </>
                      )}
                  </BlinkCell>
                ));
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DaysPart;
