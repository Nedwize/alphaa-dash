import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Login, Dashboard, AddDashboard, DashboardsList } from "../index";
import { AuthService } from "../../services/authService";

const Routing = () => {
  const [isLoggedIn, setLoggedIn] = useState(AuthService.isLoggedIn());
  const [welcome, setWelcome] = useState(false);
  const loginSession = (token: string) => {
    setLoggedIn(true);
    setWelcome(true);
  };
  const logoutSession = () => {
    AuthService.signOut();
    setLoggedIn(false);
  };
  return (
    <>
      <BrowserRouter>
        <Switch>
          {isLoggedIn ? (
            <>
              <Route
                path="/"
                exact
                render={(props) => (
                  <DashboardsList
                    open={welcome}
                    close={() => setWelcome(false)}
                    {...props}
                    logoutSession={logoutSession}
                  />
                )}
              />
              <Route
                path="/todo"
                exact
                render={(props) => (
                  <Dashboard
                    open={welcome}
                    close={() => setWelcome(false)}
                    {...props}
                    logoutSession={logoutSession}
                  />
                )}
              />
            </>
          ) : (
            <>
              <Route
                path="/login"
                exact
                render={(props) => (
                  <Login {...props} loginSession={loginSession} />
                )}
              />
              <Route
                path="*"
                render={(props) => (
                  <Login {...props} loginSession={loginSession} />
                )}
              />
            </>
          )}
        </Switch>
      </BrowserRouter>
    </>
  );
};

export default Routing;
