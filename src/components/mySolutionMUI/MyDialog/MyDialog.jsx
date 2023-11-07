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
  setAbsences,
  substitutes,
}) => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      from: format(new Date(clickedDay), "yyyy-MM-dd"),
      to: "",
      substitute: "",
    },
  });

  const onSubmit = ({ from, to, substitute }) => {
    console.log('submit');
    const diff =
      Math.floor((new Date(to) - new Date(from)) / (1000 * 60 * 60 * 24)) + 1;

    setAbsences((prevAbsences) => [
      ...prevAbsences,
      {
        id: uniqueId("absence"),
        from: new Date(from).setHours(0),
        to: new Date(to).setHours(0),
        diff,
        substitute,
      },
    ]);
    setIsOpen(false);
  };

  const onClose = (event) => {
    event.stopPropagation();
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
            {...register("from", { required: true })}
          />
          {errors.from && (
            <Typography variant="h6">Это поле обязательное</Typography>
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
              validate: (value) =>
                value >= getValues("from") ||
                "toDate should be later than fromDate",
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
