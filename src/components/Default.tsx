import React, { useState } from 'react';
import useStyles from '../custom-hooks/useStyles';
import style from '../assets/style';
import { HeaderComponent } from '.';
function DashboardsList(props: any) {
  const user = JSON.parse(sessionStorage.getItem('userData') || '');
  const classes = useStyles(style)();
  const [openTask, setOpenTask] = useState(false);
  const { dashboards, onDelete, onAdd } = props;

  const getDashboard = (dashboard: any) => (
    <div
      style={{
        display: 'inline-block',
        width: 250,
        height: 100,
        border: '3px solid black',
        margin: 20,
      }}
    >
      <div style={{ display: 'inline-block', padding: 40 }}>
        <div style={{ display: 'flex' }}>
          <div style={{ display: 'flex', flexGrow: 1, fontWeight: 'bold' }}>
            {dashboard.title}
          </div>
          <div
            onClick={() => onDelete(dashboard.id)}
            style={{
              cursor: 'pointer',
              display: 'inline-block',
              marginLeft: 10,
              padding: '0px 5px',
              fontWeight: 'bold',
            }}
          >
            X
          </div>
        </div>
      </div>
    </div>
  );

  const getAddDashboard = () => (
    <div
      style={{
        display: 'inline-block',
        width: 250,
        height: 100,
        border: '3px dashed black',
      }}
    >
      <div
        style={{
          display: 'inline-block',
          padding: 40,
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
        onClick={() => onAdd()}
      >
        Add Dashboard
      </div>
    </div>
  );

  return (
    <div className={classes.body}>
      <HeaderComponent
        logoutSession={props.logoutSession}
        user={user}
        setOpenTask={setOpenTask}
      />
      <div style={{ margin: 'auto', width: '100%', textAlign: 'center' }}>
        {getAddDashboard()}
        {dashboards.map((dashboard: any) => getDashboard(dashboard))}
      </div>
    </div>
  );
}

DashboardsList.defaultProps = {
  dashboards: [{ title: 'Dashboard1' }, { title: 'Dashboard2' }],
  onClose: () => {},
  onAdd: () => {},
};

export default DashboardsList;
