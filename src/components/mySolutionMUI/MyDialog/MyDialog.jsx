import React from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { uniqueId } from "lodash";

const MyDialog = ({ isOpen, setIsOpen, setAbsences, substitutes }) => {
  const { register, handleSubmit } = useForm({});

  const onSubmit = ({ from, to, substitute }) => {
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
          <TextField
            type="date"
            fullWidth
            required
            label="По"
            margin="dense"
            InputLabelProps={{
              shrink: true,
            }}
            {...register("to", { required: true })}
          />
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
