import React, { useState, useEffect } from 'react';
import RGL, { WidthProvider, Layout } from 'react-grid-layout';
import { IconButton } from '@material-ui/core';
import { Edit, Delete } from '@material-ui/icons';
import { deleteAPI } from '../../services/api';
import { Dimension } from '../../services/utils';
const ReactGridLayout = WidthProvider(RGL);

interface Props {
  userId: string;
  taskList: Dimension[];
  setOpenTask: (id: string) => void;
}

const TodoList = (props: Props) => {
  const [layout, setLayout] = useState(props.taskList);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setLayout(props.taskList);
  }, [props.taskList]);

  const deleteList = (item: Dimension) => {
    deleteAPI(`/todos/${item._id}`)
      .then((res) => {
        setLayout(() => {
          let titleIndex = 0;
          layout.map((i, index) => {
            if (i['_id'] === item._id) titleIndex = index;
            return true;
          });
          layout.splice(titleIndex, 1);
          return layout;
        });
        setToggle(!toggle);
      })
      .catch((err) => console.log(err));
  };

  const editList = (item: Dimension) => {
    props.setOpenTask(item._id);
  };
  const onLayoutChange = (layout: Layout[]) => {
    localStorage.setItem(props.userId, JSON.stringify(layout));
  };
  console.log(layout[1]);
  return (
    <React.Fragment>
      <ReactGridLayout
        {...props}
        onLayoutChange={(layout) => onLayoutChange(layout)}
      >
        {layout.map((item) => (
          <div key={item.i} data-grid={item}>
            <IconButton
              className="edit"
              aria-label="Close"
              onClick={(e) => editList(item)}
            >
              <Edit />
            </IconButton>
            <IconButton
              className="delete"
              aria-label="Close"
              onClick={(e) => deleteList(item)}
            >
              <Delete />
            </IconButton>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </div>
        ))}
      </ReactGridLayout>
    </React.Fragment>
  );
};
TodoList.defaultProps = {
  isDraggable: true,
  isResizable: true,
  items: 5,
  rowHeight: 30,
  preventCollision: false,
  cols: 12,
};
export default TodoList;
