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
  return absences.map((absence,i) => {
    amountOfDays.current = absence.diff;
    if (absence.from > elDay.date || absence.to < elDay.date) return null;
    if (absence.from === elDay.date) {
      return (
        <AbsenceCard
          ref={(ref) => fromEl.current?.push(ref)}
          key={absence.id}
          label={absence.substitute}
          absenceWidth={absenceWidth[i]}
          absenceDays={absence.diff}
          onAddSubstitute
          onDeleteAbsence={(event) =>
            handleDeleteAbsence(event, dayIndex, monthIndex)
          }
        />
      );
    }
    if (absence.to === elDay.date) {
      return <div ref={(ref) => toEl.current?.push(ref)} key={uniqueId()} style={{ width: "90%" }} />;
    }
    return <Fragment key={uniqueId()} />;
  });
};
