import React, { useState } from "react";

import cl from "./AbsenceCard.module.css";
import { Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AbsenceCard = ({
  label = "",
  amountDays,
  onAddSubstitute,
  onDeleteAbsence,
}) => {
  const [substitute, setSubstitute] = useState(label);

  return (
    <div className={cl.absence_card}>
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

export default AbsenceCard;
