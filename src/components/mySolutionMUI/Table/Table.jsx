import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import cl from "./Table.module.css";
import { Table as TableMUI, TableBody } from "@mui/material";
import { getLabels } from "../../../utils/data";
import { getDaysInMonth } from "../../../utils/getDays";
import TableHeader from "../TableHeader/TableHeader";
import TableContent from "../TableContent/TableContent";
import { addDays, format } from "date-fns";

const Table = () => {
  const [months, setMonths] = useState([
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() - 1),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth()),
    getDaysInMonth(new Date().getFullYear(), new Date().getMonth() + 1),
  ]);
  const [labels, setLabels] = useState(getLabels());
  const currentDay = useRef(null);
  const clickedDay = useRef(null);
  const currentPosition = useRef(null);

  const callback = useCallback(
    (entries, observer) => {
      let currentMonth;
      let currentYear;

      entries.forEach((entry) => {
        if (
          months[0].daysOfMonth[20]?.id === entry.target?.id &&
          entry.isIntersecting &&
          entry.intersectionRatio > 0
        ) {
          console.log(window.scrollX);
          currentPosition.current = window.scrollX;

          currentMonth = new Date(months[0].daysOfMonth[0].date).getMonth();
          currentYear = new Date(months[0].daysOfMonth[0].date).getFullYear();

          setMonths((prevVal) => [
            getDaysInMonth(new Date().getFullYear(), currentMonth - 1),
            ...prevVal,
          ]);

          observer.unobserve(entry.target);
        }

        if (
          months[months.length - 1].daysOfMonth[10]?.id === entry.target?.id &&
          entry.isIntersecting &&
          entry.intersectionRatio > 0
        ) {
          currentMonth = new Date(
            months[months.length - 1].daysOfMonth[0].date
          ).getMonth();
          currentYear = new Date(
            months[months.length - 1].daysOfMonth[0].date
          ).getFullYear();

          setMonths((prevVal) => [
            ...prevVal,
            getDaysInMonth(currentYear, currentMonth + 1),
          ]);
          observer.unobserve(entry.target);
        }
      });
    },
    [months]
  );

  useEffect(() => {
    if (currentPosition.current) {
      window.scrollTo({ left: currentPosition.current + 3000 });
    }

    const observer = new IntersectionObserver(callback);
    const daysNode = document.querySelectorAll(".days_header");
    daysNode.forEach((day) => observer.observe(day));
  }, [months, callback]);

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
    // console.log(countOfDays);
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
  }, []);

  return (
    <div className={cl.table}>
      <TableMUI stickyHeader >
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
      </TableMUI>
    </div>
  );
};

export default Table;
