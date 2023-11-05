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
import TableHeader from "../TableHeader/TableHeader";
import { substituteName } from "./styles";
import { detectFirstNLastAbsence } from "./detectFirstNLastAbscense";

const DaysPart = () => {
  const [labels] = useState(getLabels());
  const [daysInYear] = useState([getDaysInMonth(new Date().getFullYear(), 10)]);
  const [absences, setAbsences] = useState([]);
  const [isOpenDialog, setIsOpenDialog] = useState(false);
  const clickedDay = useRef();
  const fromEl = useRef();
  const toEl = useRef();
  const absenceWidth = useRef();
  const amountOfDays = useRef();

  const handleAddAbsencePeriod = (elDay, dayIndex, monthIndex, labelIndex) => {
    if (labelIndex !== 0) return;

    const targetDay = daysInYear[monthIndex].days[dayIndex].day;
    clickedDay.current = { index: dayIndex, date: elDay.date };

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

  useEffect(() => {
    absenceWidth.current =
      toEl.current?.getBoundingClientRect().right -
      fromEl.current?.getBoundingClientRect().left;
  });

  return (
    <div className={cl.days_part}>
      <Table stickyHeader>
        <TableHeader daysInYear={daysInYear} />
        <TableBody>
          {labels.map((el, labelIndex) => (
            <TableRow key={el.id} sx={{ position: "relative" }}>
              <TableCell align="center" sx={substituteName}>
                {el.label}
              </TableCell>
              {daysInYear.map(({ days }, monthIndex) => {
                return days.map((elDay, dayIndex) => (
                  <BlinkCell
                    key={uniqueId()}
                    amountOfDays={amountOfDays.current}
                    handleClick={() =>
                      handleAddAbsencePeriod(
                        elDay,
                        dayIndex,
                        monthIndex,
                        labelIndex
                      )
                    }
                  >
                    {clickedDay.current?.index === dayIndex &&
                      labelIndex === 0 && (
                        <MyDialog
                          clickedDay={clickedDay.current.date}
                          isOpen={isOpenDialog}
                          setIsOpen={setIsOpenDialog}
                          setAbsences={setAbsences}
                          substitutes={labels}
                        />
                      )}
                    {labelIndex === 0 &&
                      detectFirstNLastAbsence(
                        absences,
                        elDay,
                        fromEl,
                        toEl,
                        dayIndex,
                        monthIndex,
                        handleDeleteAbsence,
                        absenceWidth,
                        amountOfDays
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
