import React, { useEffect, useRef, useState } from "react";

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
  const clickedDay = useRef();

  const handleAddAbsencePeriod = (dayIndex, monthIndex, labelIndex) => {
    if (labelIndex !== 0) return;

    const targetDay = daysInYear[monthIndex].days[dayIndex].day;
    clickedDay.current = dayIndex;

    if (absences.find((absence) => absence.from === targetDay)) return;

    setIsOpenDialog(true);
  };

  const handleDeleteAbsence = (event, dayIndex, monthIndex) => {
    event.stopPropagation();
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
                    maxWidth: 75,
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
            <TableRow key={el.id} sx={{ position: "relative" }}>
              <TableCell
                align="center"
                sx={{
                  backgroundColor: "white",
                  borderRight: "1px solid grey",
                  position: "sticky",
                  zIndex: 2,
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
                    {clickedDay.current === dayIndex && labelIndex === 0 && (
                      <MyDialog
                        isOpen={isOpenDialog}
                        setIsOpen={setIsOpenDialog}
                        setAbsences={setAbsences}
                        substitutes={labels}
                      />
                    )}
                    {labelIndex === 0 &&
                      absences.map((absence) => {
                        if (absence.from === elDay.date) {
                          return (
                            <AbsenceCard
                              key={absences[0].id}
                              label={absences[0].substitute}
                              amountDays={absences[0].diff}
                              onAddSubstitute
                              onDeleteAbsence={(event) =>
                                handleDeleteAbsence(event, dayIndex, monthIndex)
                              }
                            />
                          );
                        }
                      })}
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
