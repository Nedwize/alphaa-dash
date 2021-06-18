import React, { useEffect } from 'react';
import useStyles from '../../custom-hooks/useStyles';
import style from '../../assets/style';
import { Button } from '@material-ui/core';
import logo from '../../assets/images/logo.png';
import { useHistory } from 'react-router-dom';
import { AuthService } from '../../services/authService';
import { fetchAPI } from '../../services/api';

interface Props {
  location: any;
  loginSession: (token: string) => void;
}

const Login = ({ location, loginSession }: Props) => {
  const classes = useStyles(style)();
  let history = useHistory();
  useEffect(() => {
    if (location && location.search) {
      const session = location.search.split('=');
      AuthService.authenticate(session[1]);
      fetchAPI(`/user`)
        .then((res) => {
          if (res.data && Object.keys(res.data).length) {
            AuthService.setUserData(res.data);
            history.push('/todo');
            loginSession(session[1]);
          }
        })
        .catch((err) => console.log(err));
    }
  }, []);
  return (
    <div className={classes.signInDiv}>
      <a href="http://localhost:4000/api/v1/auth/linkedin">
        <Button>
          <img alt="linkedin logo" src={logo} />
          Sign in with LinkedIn
        </Button>
      </a>
    </div>
  );
};

export default Login;
