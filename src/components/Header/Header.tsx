import React, { useState } from 'react';
import useStyles from '../../custom-hooks/useStyles';
import style from '../../assets/style';
import userImage from '../../assets/images/user.jpg';
import { fetchAPI } from '../../services/api';
import { useHistory } from 'react-router-dom';
import {
  Menu,
  MenuItem,
  Tooltip,
  Fab,
} from '@material-ui/core';
import { MoreVert, Add } from '@material-ui/icons';
import { User } from '../../interface';
import {Header,HeaderRight} from "ayush-todo-react-component"

const HeaderComponent = ({
  user,
  logoutSession,
  setOpenTask,
}: {
  user: User;
  logoutSession: VoidFunction;
  setOpenTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const classes = useStyles(style)();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    fetchAPI(`/logout`).then((res) => {
      history.push('/login');
      logoutSession();
    });
  };
  console.log(user)
  return (
    <div>
      <Header name={user && user.name ? user.name : userImage}  imageSrc={user && user.avatar ? user.avatar : ''}>
        <HeaderRight handleSetOpen={() => setOpenTask(true)}/>
       <div className={classes.headerRight}>
            <Tooltip title="Add Task">
              <Fab
                className={'add'}
                aria-label="add"
                onClick={() => setOpenTask(true)}
              >
                <Add />
              </Fab>
            </Tooltip>
            <Fab
              className={'dot'}
              aria-controls="long-menu"
              onClick={handleClick}
            >
              <MoreVert />
            </Fab>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch',
                },
              }}
            >
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>
          </div>
      </Header>
    </div>
  );
};

export default HeaderComponent;



