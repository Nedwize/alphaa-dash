import React, { useState, useEffect } from 'react';
import {
  TextField,
  Grid,
  Dialog,
  DialogContent,
  IconButton,
  DialogTitle,
  Button,
  DialogActions,
} from '@material-ui/core';
import useStyles from '../../custom-hooks/useStyles';
import style from '../../assets/style';
import { Clear } from '@material-ui/icons';
import Waterfall from '../Charts/Waterfall';
import Bar from '../Charts/Bar';

interface Props {
  addTask: (event: any, task: any) => void;
  open: boolean;
  id: string | null;
  listData: any;
  close: VoidFunction;
}

interface IError {
  title: boolean;
  type: boolean;
}

const AddTask = (props: Props) => {
  const classes = useStyles(style)();
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [active, setActive] = useState('waterfall');
  const [isDisable, setIsDisable] = useState(false);
  const [isError, setIsError] = useState<IError>({
    title: false,
    type: false,
  });
  const CheckIfNotEmpty = (text: string) =>
    !(text == null || /^\s*$/.test(text));

  useEffect(() => {
    setTitle(props.listData.current.title);
    setType(props.listData.current.type);
  }, [props.id, props.listData]);

  const checkEnable = (
    input: EventTarget & (HTMLInputElement | HTMLTextAreaElement)
  ) => {
    !CheckIfNotEmpty(input.value)
      ? setValue(input.name as keyof IError, true)
      : setValue(input.name as keyof IError, false);
  };
  const setValue = (input: keyof IError, bool: boolean) => {
    setIsError((previousState) => {
      previousState[input] = bool;
      return previousState;
    });
    setIsDisable(!isDisable);
  };
  const clearState = () => {
    setType('');
    setTitle('');
  };
  return (
    <Dialog
      className={classes.modalWidth}
      open={props.open}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
      onClose={props.close}
      key={props.id ? props.id : ''}
      onExit={clearState}
    >
      <DialogTitle className={classes.dialogTitle}>
        {props.id ? 'Update Task' : 'Add Task'}
      </DialogTitle>
      <DialogContent className={classes.dialogContent}>
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
              name="title"
              defaultValue={title}
              placeholder="Add Task"
              type="text"
              helperText={isError.title ? 'Please enter task' : ''}
              error={isError.title}
              onChange={(e) => {
                setTitle(e.target.value);
                checkEnable(e.target);
              }}
              onBlur={(e) => {
                setTitle(e.target.value);
                checkEnable(e.target);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {active == 'bar' ? <Bar /> : <Waterfall />}
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Grid className={classes.actionButton} item xs={12} sm={12} md={12}>
          <Button type="button" onClick={(e) => setActive('waterfall')}>
            WaterFall
          </Button>
          <Button type="button" onClick={(e) => setActive('bar')}>
            Bar
          </Button>
          <Button
            onClick={props.close}
            className={'buttonCancel'}
            type="button"
          >
            Cancel
          </Button>
          <Button
            className={'buttonDefault'}
            onClick={(e) => props.addTask(e, { title, type })}
            type="submit"
            disabled={
              props.id ? false : isError.title || isError.type || !title
            }
          >
            {props.id ? 'Update' : 'Add'}
          </Button>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default AddTask;
