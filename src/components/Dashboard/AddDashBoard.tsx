import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  TextField,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Button,
  DialogActions,
} from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import useStyles from "../../custom-hooks/useStyles";
import style from "../../assets/style";

const AddDashboard = (props: any) => {
  const classes = useStyles(style)();
  let history = useHistory();

  const [dashboardName, setDashboardName] = useState("");

  const handleSubmit = () => {
    history.push(`/dashboard/${dashboardName}`);
  };
  const clearState = () => {
    setDashboardName("");
  };

  return (
    <div>
      <Dialog
        open={props.open}
        onClose={props.close}
        aria-labelledby="form-dialog-title"
        className={classes.modalWidth}
        onExit={clearState}
      >
        <DialogTitle className={classes.dialogTitle} id="form-dialog-title">
          New Dashboard
        </DialogTitle>
        <DialogContent className={classes.dialogContent} style={{ height: 80 }}>
          <IconButton
            onClick={props.close}
            aria-label="Close"
            className={classes.cancelCrossIcon}
          >
            <Clear />
          </IconButton>
          <Grid container>
            <Grid item xs={12} sm={12} md={12}>
              <TextField
                defaultValue={dashboardName}
                name="dashboard"
                placeholder="Add Dashboard"
                type="text"
                onChange={(e) => setDashboardName(e.target.value)}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Grid className={classes.actionButton} item xs={12} sm={12} md={12}>
            <Button
              onClick={props.close}
              className={"buttonCancel"}
              type="button"
            >
              Cancel
            </Button>
            <Button
              className={"buttonDefault"}
              type="submit"
              onClick={handleSubmit}
            >
              Add
            </Button>
          </Grid>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddDashboard;
