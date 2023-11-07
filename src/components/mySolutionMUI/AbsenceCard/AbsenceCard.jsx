import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";

import cl from "./AbsenceCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AbsenceCard = (
  { label = "", absenceWidth, onAddSubstitute, onDeleteAbsence, absenceDays },
  ref
) => {
  const [substitute, setSubstitute] = useState(label);
  const isOneAbsence = useRef();

  useLayoutEffect(() => {
    isOneAbsence.current = absenceDays === 1;
// console.log(absenceWidth);
    // ref.current.style.width = `${absenceWidth.current}px`;
  });

  return (
    <div
      className={isOneAbsence.current ? cl.absence_card_one : cl.absence_card}
      ref={ref}
    >
      {/* {console.log(isOneAbsence.current)} */}
      <div className={cl.absence_label}>{substitute}</div>
      <button
        type="button"
        className={cl.absence_float_button}
        onClick={(event) => onAddSubstitute(event, setSubstitute)}
      >
        <AddIcon fontSize="5px" />
      </button>
      <button
        type="button"
        className={cl.absence_float_button}
        onClick={onDeleteAbsence}
      >
        <DeleteIcon fontSize="5px" />
      </button>
    </div>
  );
};

export default forwardRef(AbsenceCard);
