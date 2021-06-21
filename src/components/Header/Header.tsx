import React, { useState } from "react";
import useStyles from "../../custom-hooks/useStyles";
import style from "../../assets/style";
import userImage from "../../assets/images/user.jpg";
import { fetchAPI } from "../../services/api";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import { MoreVert, Add } from "@material-ui/icons";
import { User } from "../../interface";
import { Header, HeaderRight } from "ayush-todo-react-component";

const HeaderComponent = ({
  user,
  logoutSession,
  setOpenTask,
}: {
  user: User;
  logoutSession: VoidFunction;
  setOpenTask: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  let history = useHistory();
  const onLogout = () => {
    fetchAPI(`/logout`).then((res) => {
      history.push("*");
      logoutSession();
    });
  };
  return (
    <div>
      <Header
        name={user && user.name ? user.name : userImage}
        imageSrc={user && user.avatar ? user.avatar : ""}
      >
        <HeaderRight
          handleSetOpen={() => setOpenTask(true)}
          handleLogOut={onLogout}
        >
          <Button
            style={{
              height: "40px",
              width: "130px",
              right: "40px",
              background: "#e0e0e0",
            }}
            onClick={() => {
              history.push("/");
            }}
          >
            Dashboards
          </Button>
        </HeaderRight>
      </Header>
    </div>
  );
};

export default HeaderComponent;
