import React, { forwardRef, useLayoutEffect, useRef, useState } from "react";

import cl from "./AbsenceCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDrag } from "react-dnd";

const AbsenceCard = ({
  label,
  onAddSubstitute,
  onDeleteAbsence,
  amountOfDays,
}) => {
  const [substitute, setSubstitute] = useState(label);
  const isOneDay = useRef(amountOfDays === 1);
  const firstElRef = useRef(null);
  // const [{ isDragging }, drag] = useDrag(() => ({
  //   type: "AbsenceCard",
  //   collect: (monitor) => ({
  //     isDragging: !!monitor.isDragging(),
  //   }),
  // }));

  useLayoutEffect(() => {
    // drag(firstElRef.current);
    const columnWidthDom =
      firstElRef.current.offsetParent.firstChild.nextSibling.clientWidth;
    const totalWidth = columnWidthDom * amountOfDays - 25;
    firstElRef.current.style.width = `${totalWidth}px`;
  }, [amountOfDays]);

  return (
    <div className={cl.absence_card} ref={firstElRef}>
      <div
        className={isOneDay.current ? cl.absence_label_one : cl.absence_label}
      >
        {substitute}
      </div>
      <div
        className={
          isOneDay.current ? cl.absence_buttons_one : cl.absence_buttons
        }
      >
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
    </div>
  );
};

export default AbsenceCard;
