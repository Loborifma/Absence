import React, { useLayoutEffect, useRef, useState } from "react";

import cl from "./AbsenceCard.module.css";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import Draggable from "react-draggable";

const AbsenceCard = ({
  setLabels,
  isCollision,
  absenceId,
  drugAbsence,
  isUserRow,
  substitute,
  amountOfDays,
  onAddSubstitute,
  onDeleteAbsence,
}) => {
  const [substituteName, setSubstituteName] = useState(substitute);
  const [totalWidth, setTotalWidth] = useState(0);
  const [translate, setTranslate] = useState(0);
  const countOfDays = useRef(amountOfDays);
  const firstElRef = useRef(null);
  const isStartGrabButton = useRef(false);
  const isEndGrabButton = useRef(false);
  const columnWidthDom = useRef(0);
  const isVisible = (classNameForOneDay, classNameForManyDays) => {
    return !isUserRow
      ? cl.hidden
      : countOfDays.current === 1
      ? classNameForOneDay
      : classNameForManyDays;
  };

  useLayoutEffect(() => {
    columnWidthDom.current =
      firstElRef.current.offsetParent.firstChild.nextSibling.clientWidth;
    setTotalWidth(columnWidthDom.current * amountOfDays - 25);
  }, [amountOfDays]);

  useLayoutEffect(() => {
    firstElRef.current.style.width = `${totalWidth}px`;
  }, [totalWidth]);

  const handleOnStart = (event) => {
    const node = document.getElementById(absenceId);
    const grabButtonStart = document.getElementById(
      `grab_button_start${absenceId}`
    );
    const grabButtonEnd = document.getElementById(
      `grab_button_end${absenceId}`
    );
    node.style.zIndex = 2;
    node.style.cursor = "grabbing";
    isStartGrabButton.current = event.target === grabButtonStart;
    isEndGrabButton.current = event.target === grabButtonEnd;
  };

  const handleOnStop = (event, data) => {
    const node = document.getElementById(absenceId);

    node.style.zIndex = 1;
    node.style.cursor = "grab";
    node.style.backgroundColor = isCollision && "red";

    const diffDays = Math.round(data.x / 107.667);

    drugAbsence.current = {
      id: absenceId,
      diffDays,
      countOfDays: countOfDays.current,
    };
    isStartGrabButton.current = false;
    isEndGrabButton.current = false;
  };

  const onDragStartButton = (event, data) => {
    event.stopPropagation();
    const diff = data.x > data.lastX;

    if (!diff) {
      setTotalWidth((prevVal) => prevVal + 107.667);
      setTranslate((prevVal) => prevVal - 107.667);
      countOfDays.current = countOfDays.current + 1;
    } else if (countOfDays.current !== 1) {
      setTotalWidth((prevVal) => prevVal - 107.667);
      setTranslate((prevVal) => prevVal + 107.667);
      countOfDays.current = countOfDays.current - 1;
    }
  };

  const onDragEndButton = (event, data) => {
    event.stopPropagation();
    const diff = data.x > data.lastX;

    if (diff) {
      setTotalWidth((prevVal) => prevVal + 107.667);
      setTranslate((prevVal) => prevVal - 0.0001);
      countOfDays.current = countOfDays.current + 1;
    } else if (countOfDays.current !== 1) {
      setTotalWidth((prevVal) => prevVal - 107.667);
      setTranslate((prevVal) => prevVal + 0.0001);
      countOfDays.current = countOfDays.current - 1;
    }
  };

  return (
    <Draggable
      nodeRef={firstElRef}
      disabled={!isUserRow}
      axis="x"
      grid={[107.667, 107.667]}
      position={{ x: translate, y: 0 }}
      onStart={handleOnStart}
      onDrag={(event, data) => {
        if (isStartGrabButton.current) onDragStartButton(event, data);
        if (isEndGrabButton.current) onDragEndButton(event, data);
      }}
      onStop={handleOnStop}
    >
      <div id={absenceId} className={cl.absence_card} ref={firstElRef}>
        <div
          id={`grab_button_start${absenceId}`}
          className={isVisible(cl.grab_button_start_one, cl.grab_button_start)}
        >
          ||
        </div>
        <div
          className={
            countOfDays.current === 1 ? cl.absence_label_one : cl.absence_label
          }
        >
          {substituteName}
        </div>
        <div className={isVisible(cl.absence_buttons_one, cl.absence_buttons)}>
          <button
            type="button"
            className={cl.absence_float_button}
            onClick={(event) => onAddSubstitute(event, setSubstituteName)}
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
        <div
          id={`grab_button_end${absenceId}`}
          className={isVisible(cl.grab_button_end_one, cl.grab_button_end)}
        >
          ||
        </div>
      </div>
    </Draggable>
  );
};

export default AbsenceCard;
