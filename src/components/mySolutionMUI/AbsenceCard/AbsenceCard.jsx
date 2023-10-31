import React, { useState } from "react";

import cl from "./AbsenceCard.module.css";
import { Fab, Paper } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";

const AbsenceCard = React.memo(
  ({ label, onAddSubstitute, onDeleteAbsence }) => {
    const [substitute, setSubstitute] = useState("");

    return (
      <Paper
        elevation={2}
        sx={{
          height: "100%",
          backgroundColor: "rgb(128, 216, 128)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
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
      </Paper>
    );
  }
);

export default AbsenceCard;
