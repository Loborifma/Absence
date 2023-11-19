import { uniqueId } from "lodash";
import AbsenceCard from "../AbsenceCard/AbsenceCard";
import { Fragment } from "react";

const AbsencePeriods = ({
  labels,
  setLabels,
  isCollision,
  absenceId,
  drugAbsence,
  isUserRow,
  startDate,
  endDate,
  substitute,
  amountOfDays,
  date,
  handleDeleteAbsence,
}) => {
  if (startDate > date || endDate < date) return null;
  if (startDate === date) {
    return (
      <AbsenceCard
        labels={labels}
        setLabels={setLabels}
        isCollision={isCollision}
        absenceId={absenceId}
        drugAbsence={drugAbsence}
        isUserRow={isUserRow}
        substitute={substitute}
        amountOfDays={amountOfDays}
        onAddSubstitute
        onDeleteAbsence={handleDeleteAbsence}
      />
    );
  }
  return <Fragment key={uniqueId()} />;
};

export default AbsencePeriods;
