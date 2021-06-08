import React,{useState} from "react";
import useStyles from "../../custom-hooks/useStyles";
import style from "../../assets/style";
import userImage from "../../assets/images/user.jpg";
import { fetchAPI } from "../../services/api";
import { useHistory } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Avatar,
  Menu,
  MenuItem,
  Tooltip,
  Fab
} from "@material-ui/core";
import { MoreVert, Add } from "@material-ui/icons";

const Header = ({user,logoutSession,setOpenTask}) => {
  const classes = useStyles(style)();
  let history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const onLogout = () => {
    fetchAPI(`/logout`).then((res) => {
      history.push("/login");
      logoutSession();
    });
  };
  return (
    <div>
      <AppBar className={classes.headerBar}>
        <Toolbar>
          <div className={classes.headerLeft}>
            <Avatar
              alt="user profile"
              src={user && user.avatar ? user.avatar : userImage}
            />
            <h4 className={classes.userName}>{user && user.name ? user.name :''}</h4>
          </div>
          <div className={classes.headerRight}>
              <Tooltip title="Add Task">
              <Fab className={'add'} aria-label="add" onClick={() => setOpenTask(true)}>
                <Add />
              </Fab>
            </Tooltip>
            <Fab className={'dot'} aria-controls="long-menu" onClick={handleClick}>
                <MoreVert />
            </Fab>
            {/* <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVert />
            </IconButton> */}
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              keepMounted
              open={open}
              onClose={handleClose}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: "20ch",
                },
              }}
            >
              <MenuItem onClick={onLogout}>Logout</MenuItem>
            </Menu>

            {/* <Button onClick={onLogout}> Logout</Button> */}
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
