import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import cl from "./DaysPart.module.css";
import { Table, TableBody } from "@mui/material";
import { getLabels } from "../../../utils/data";
import { getDaysInMonth } from "../../../utils/getDays";
import TableHeader from "../TableHeader/TableHeader";
import TableContent from "../TableContent/TableContent";
import { addDays, format } from "date-fns";

const DaysPart = () => {
  const [months] = useState([
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() - 1),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth()),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1),
  ]);
  const [labels, setLabels] = useState(getLabels());
  const currentDay = useRef(null);
  const clickedDay = useRef(null);
  const isFirstTimeFirstPart = useRef(false);
  const isFirstTimeLastPart = useRef(false);

  const callback = (entries, observer) => {
    entries.forEach((entry) => {
      if (months[0].daysOfMonth[15].id === entry.target.id) {
        if (isFirstTimeFirstPart.current) {
          console.log(entry.target);
          observer.unobserve(entry.target);
        } else {
          isFirstTimeFirstPart.current = true;
        }
      }
      if (months[months.length - 1].daysOfMonth[15].id === entry.target.id) {
        if (isFirstTimeLastPart.current) {
          console.log(entry.target);
          observer.unobserve(entry.target);
        } else {
          isFirstTimeLastPart.current = true;
        }
      }
    });
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback);
    const daysNode = document.querySelectorAll(".days_header");
    daysNode.forEach((day) => observer.observe(day));

    if (isFirstTimeFirstPart.current || isFirstTimeLastPart.current) {
      isFirstTimeFirstPart.current = false;
      isFirstTimeLastPart.current = false;
    }
  }, [months]);

  const handleAddAbsencePeriod = (
    elDay,
    dayIndex,
    monthIndex,
    label,
    labelIndex,
    setIsOpenDialog
  ) => {
    if (labelIndex !== 0) return;

    const targetDayUTC = months[monthIndex].daysOfMonth[dayIndex].date;
    const targetDay = format(targetDayUTC, "yyyy-MM-dd");
    clickedDay.current = { index: dayIndex, date: elDay.date };

    if (
      label.absences.find(
        (absence) => absence.from <= targetDay && targetDay <= absence.to
      )
    ) {
      return;
    }

    setIsOpenDialog(true);
  };

  const handleDeleteAbsence = (event, dayIndex, monthIndex) => {
    event.stopPropagation();
    const targetDayUTC = months[monthIndex].daysOfMonth[dayIndex].date;
    const targetDay = format(targetDayUTC, "yyyy-MM-dd");

    setLabels((prevVal) => {
      const indexOfTargetAbsence = prevVal[0].absences.findIndex(
        (absence) => absence.from === targetDay
      );

      const newAbsences = prevVal[0].absences.toSpliced(
        indexOfTargetAbsence,
        1
      );

      return prevVal.map((el, i) =>
        i === 0 ? { ...el, absences: newAbsences } : el
      );
    });
  };

  const handleMouseUp = (absence) => {
    if (!absence.current.id) return;

    const { id: absenceId, diffDays, countOfDays } = absence.current;
    absence.current = {};
    console.log(countOfDays);
    setLabels((prevVal) => {
      const indexOfTargetAbsence = prevVal[0].absences.findIndex(
        (el) => el.id === absenceId
      );

      const targetAbsence = prevVal[0].absences[indexOfTargetAbsence];
      const newFromDate = addDays(new Date(targetAbsence.from), diffDays);
      const newToDate = addDays(newFromDate, countOfDays - 1);

      const newAbsence = {
        ...targetAbsence,
        from: format(newFromDate, "yyyy-MM-dd"),
        to: format(newToDate, "yyyy-MM-dd"),
      };
      const newAbsences = prevVal[0].absences.toSpliced(
        indexOfTargetAbsence,
        1,
        newAbsence
      );
      return prevVal.map((el, i) =>
        i === 0 ? { ...el, absences: newAbsences } : el
      );
    });
  };

  useLayoutEffect(() => {
    const node = document.getElementById(currentDay.current);
    node.scrollIntoView({ inline: "center" });
    window.scrollTo({ top: 0 });
    console.log("DaysPart", currentDay.current);
  }, []);

  return (
    <div className={cl.days_part}>
      <Table stickyHeader>
        <TableHeader months={months} currentDay={currentDay} />
        <TableBody>
          {labels.map((label, labelIndex) => {
            return (
              <TableContent
                key={label.id}
                labels={labels}
                label={label}
                labelIndex={labelIndex}
                months={months}
                clickedDay={clickedDay}
                setLabels={setLabels}
                handleAddAbsencePeriod={handleAddAbsencePeriod}
                handleDeleteAbsence={handleDeleteAbsence}
                handleMouseUp={handleMouseUp}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DaysPart;
