import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

import cl from "./DaysPart.module.css";
import { Table, TableBody } from "@mui/material";
import { getLabels } from "../../../utils/data";
import { getDaysInMonth } from "../../../utils/getDays";
import TableHeader from "../TableHeader/TableHeader";
import TableContent from "../TableContent/TableContent";

const DaysPart = () => {
  const [months] = useState([
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() - 1),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth()),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1),
  ]);
  const [labels, setLabels] = useState(getLabels());
  const currentDay = useRef();
  const clickedDay = useRef();

  const handleAddAbsencePeriod = (
    elDay,
    dayIndex,
    monthIndex,
    label,
    labelIndex,
    setIsOpenDialog
  ) => {
    if (labelIndex !== 0) return;

    const targetDay = months[monthIndex].daysOfMonth[dayIndex].date;
    clickedDay.current = { index: dayIndex, date: elDay.date };

    if (label.absences.find((absence) => absence.from === targetDay)) return;

    setIsOpenDialog(true);
  };

  const handleDeleteAbsence = (event, dayIndex, monthIndex, label) => {
    event.stopPropagation();
    const targetDay = months[monthIndex].daysOfMonth[dayIndex].date;

    const indexOfTargetAbsence = label.absences.findIndex(
      (absence) => absence.from === targetDay
    );

    setLabels((prevVal) => {
      const targetLabel = prevVal.find((el) => el.id === label.id);
      const newAbsences = targetLabel.absences.toSpliced(
        indexOfTargetAbsence,
        1
      );

      return prevVal.map((el) =>
        el.id === targetLabel.id ? { ...el, absences: newAbsences } : el
      );
    });
  };

  useLayoutEffect(() => {
    currentDay.current = months
      .map(({ daysOfMonth }) =>
        daysOfMonth.find(
          (elDay) => elDay.date === new Date().setHours(0, 0, 0, 0)
        )
      )
      .filter((el) => el)
      .map((el) => el.id)
      .toString();
  }, [months]);

  useEffect(() => {
    const node = document.getElementById(currentDay.current);
    node.scrollIntoView({ inline: "center", block: "center" });
  }, []);

  return (
    <div className={cl.days_part}>
      <Table stickyHeader>
        <TableHeader months={months} />
        <TableBody>
          {labels.map((label, labelIndex) => {
            return (
              <TableContent
                key={label.id}
                label={label}
                months={months}
                labels={labels}
                labelIndex={labelIndex}
                clickedDay={clickedDay}
                setLabels={setLabels}
                handleAddAbsencePeriod={handleAddAbsencePeriod}
                handleDeleteAbsence={handleDeleteAbsence}
              />
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default DaysPart;
