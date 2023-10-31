import React, { useState } from "react";

import cl from "./MyDialog.module.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const MyDialog = ({ isOpen, setIsOpen }) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Выберите период</DialogTitle>
      <DialogContent>
        <TextField
          type="date"
          fullWidth
          required
          label="С"
          margin="dense"
          InputLabelProps={{
            shrink: true,
          }}
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
        />
        <TextField label="Заместитель" fullWidth margin="dense" select />
        <DialogActions>
          <Button onClick={() => setIsOpen(false)}>Close</Button>
        </DialogActions>
      </DialogContent>
    </Dialog>
  );
};

export default MyDialog;
