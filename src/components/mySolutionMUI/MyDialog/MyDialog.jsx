import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { uniqueId } from "lodash";
import { format } from "date-fns";

const MyDialog = ({
  clickedDay,
  isOpen,
  setIsOpen,
  label,
  setLabels,
  substitutes,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: format(new Date(clickedDay), "yyyy-MM-dd"),
      to: format(new Date(clickedDay), "yyyy-MM-dd"),
      substitute: "No one",
    },
  });

  const onSubmit = ({ from, to, substitute }) => {
    setLabels((prevVal) => {
      const newAbsences = [
        ...prevVal[0].absences,
        {
          id: uniqueId("absence"),
          from: format(new Date(from), "yyyy-MM-dd"),
          to: format(new Date(to), "yyyy-MM-dd"),
          substitute,
        },
      ];

      return prevVal.map((item, index) =>
        index === 0 ? { ...item, absences: newAbsences } : item
      );
    });

    setIsOpen(false);
  };

  const onClose = (event) => {
    event.stopPropagation();
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Выберите период</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="date"
            fullWidth
            required
            label="С"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("from", {
              required: true,
              validate: {
                earlierThenTo: (value) =>
                  value <= getValues("from") ||
                  "This field should be earlier than field 'по'",
                isEmptyDay: (value) =>
                  label.absences.find(
                    (el) =>
                      el.from <= new Date(value).setHours(0) &&
                      new Date(value).setHours(0) <= el.to
                  ) && "This day already occupied",
              },
            })}
          />
          {errors.from && (
            <Typography variant="h6">{errors.from.message}</Typography>
          )}
          <TextField
            type="date"
            fullWidth
            required
            label="По"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("to", {
              required: true,
              validate: {
                laterThanFrom: (value) =>
                  value >= getValues("from") ||
                  "This field should be later than field 'c'",
                isEmptyDay: (value) =>
                  label.absences.find(
                    (el) =>
                      el.from <= new Date(value).setHours(0) &&
                      new Date(value).setHours(0) <= el.to
                  ) && "This day already occupied",
              },
            })}
          />
          {errors.to && (
            <Typography variant="h6">{errors.to.message}</Typography>
          )}
          <TextField
            id="substitute-select"
            label="Заместитель"
            select
            fullWidth
            margin="dense"
            defaultValue={""}
            {...register("substitute")}
          >
            {substitutes.toSpliced(0, 1).map((el) => (
              <MenuItem key={el.id} value={el.label}>
                {el.label}
              </MenuItem>
            ))}
          </TextField>
          <DialogActions>
            <Button type="submit">Apply</Button>
            <Button type="button" onClick={onClose}>
              Close
            </Button>
          </DialogActions>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
