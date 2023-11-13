import { uniqueId } from "lodash";
import AbsenceCard from "../AbsenceCard/AbsenceCard";
import { Fragment, forwardRef } from "react";

const AbsencePeriods = ({
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
        label={substitute}
        amountOfDays={amountOfDays}
        onAddSubstitute
        onDeleteAbsence={handleDeleteAbsence}
      />
    );
  }
  return <Fragment key={uniqueId()} />;
};

export default AbsencePeriods;
