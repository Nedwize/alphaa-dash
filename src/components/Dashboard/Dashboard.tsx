import React, { useState, useEffect, useRef } from 'react';
import useStyles from '../../custom-hooks/useStyles';
import style from '../../assets/style';
import { Header, AddTask, TodoList, PopUp } from '../index';
import { fetchAPI, postAPI, updateAPI } from '../../services/api';
import { getDimensions, Dimension } from '../../services/utils';
import { AxiosResponse, ResponseType } from 'axios';
import { ITodo } from '../../interface';
let idCounter = 0;

const Dashboard = (props: {
  logoutSession: VoidFunction;
  open: any;
  close: any;
}) => {
  const [openTask, setOpenTask] = useState(false);
  const [id, setId] = useState<string | null>(null);
  const user = JSON.parse(sessionStorage.getItem('userData') || '');
  const [taskList, setTaskList] = useState<Dimension[]>([]);
  let listData = useRef([]);
  const classes = useStyles(style)();
  useEffect(() => {
    fetchAPI(`/todos`)
      .then((res: AxiosResponse) => {
        const dimensions =
          JSON.parse(localStorage.getItem(user._id) || '') || [];
        const task = res.data.map((list: any, index: string | number) =>
          getDimensions(list, ++idCounter, dimensions[index])
        );
        setTaskList(task);
      })
      .catch((err) => console.log(err));
  }, []);

  const addTask = (
    event: any,
    task: { title: string; type: string; _id?: string }
  ) => {
    console.log('task:', task);
    console.log('Event:', event);
    event.preventDefault();
    if (id) {
      updateAPI(`/todos/${id}`, task)
        .then((res: any) => {
          console.log(res);
          setTaskList((previousState) => {
            let titleIndex = 0;
            taskList.map((i, index) => {
              if (i['_id'] === id) titleIndex = index;
              return true;
            });
            task['_id'] = id;
            setId(null);
            // listData = [];
            taskList.splice(
              titleIndex,
              1,
              getDimensions(
                task,
                parseInt(taskList[titleIndex].i),
                taskList[titleIndex]
              )
            );
            return taskList;
          });
          setOpenTask(false);
        })
        .catch((err) => console.log(err));
    } else {
      postAPI(`/todos`, task)
        .then((res) => {
          if (res.data && res.data.todo) {
            setTaskList((previousState) => {
              taskList.push(getDimensions(res.data.todo, ++idCounter));
              return taskList;
            });
            setOpenTask(false);
          }
        })
        .catch((err) => console.log(err));
    }
  };
  const openTaskEditModal = (id: string) => {
    if (id) {
      fetchAPI(`/todos/${id}`)
        .then((res) => {
          console.log(res.data);
          listData.current = res.data;
          setId(id);
          setOpenTask(true);
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className={classes.body}>
      <Header
        logoutSession={props.logoutSession}
        user={user}
        setOpenTask={setOpenTask}
      />
      <div className={classes.bodyDiv}>
        <div className={classes.todoList}>
          <TodoList
            userId={user._id}
            taskList={taskList}
            setOpenTask={openTaskEditModal}
          />
        </div>
      </div>
      <AddTask
        addTask={addTask}
        open={openTask}
        id={id}
        listData={listData}
        close={() => {
          setId(null);
          setOpenTask(false);
        }}
      />
      <PopUp open={props.open} close={props.close} user={user} />
    </div>
  );
};

export default Dashboard;
