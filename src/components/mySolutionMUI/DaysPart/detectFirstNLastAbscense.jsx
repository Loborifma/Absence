import { uniqueId } from "lodash";
import AbsenceCard from "../AbsenceCard/AbsenceCard";
import { Fragment } from "react";

export const detectFirstNLastAbsence = (
  absences,
  elDay,
  fromEl,
  toEl,
  dayIndex,
  monthIndex,
  handleDeleteAbsence,
  absenceWidth,
  amountOfDays
) => {
  return absences.map((absence) => {
    amountOfDays.current = absence.diff;
    if (absence.from > elDay.date || absence.to < elDay.date) return null;
    if (absence.from === elDay.date) {
      return (
        <AbsenceCard
          ref={fromEl}
          key={absence.id}
          label={absence.substitute}
          absenceWidth={absenceWidth}
          absenceDays={absence.diff}
          onAddSubstitute
          onDeleteAbsence={(event) =>
            handleDeleteAbsence(event, dayIndex, monthIndex)
          }
        />
      );
    }
    if (absence.to === elDay.date) {
      return <div ref={toEl} key={uniqueId()} style={{ width: "90%" }} />;
    }
    return <Fragment key={uniqueId()} />;
  });
};
