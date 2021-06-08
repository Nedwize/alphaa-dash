import React, { useState, useEffect } from "react";
import RGL, { WidthProvider } from "react-grid-layout";
import { IconButton } from "@material-ui/core";
import { Edit, Delete } from "@material-ui/icons";
import { deleteAPI } from "../../services/api";
const ReactGridLayout = WidthProvider(RGL);


const TodoList = (props) => {
  const [layout, setLayout] = useState(props.taskList);
  const [toggle, setToggle] = useState(false);


  useEffect(() => {
    setLayout(props.taskList);
  }, [props.taskList]);
  const deleteList = (item) => {
    deleteAPI(`/todo/${item._id}`)
      .then((res) => {
        setLayout((previousState) => {
          let titleIndex;
          layout.map((i, index) => {
            if (i['_id'] === item._id ) titleIndex = index;
            return true;
          });
          layout.splice(titleIndex, 1);
          return layout
        });
        setToggle(!toggle);
      })
      .catch((err) => console.log(err));
  };

  const editList = (item) => {
   props.setOpenTask(item._id);
  };
  const onLayoutChange=(e)=>{
    localStorage.setItem(props.userId, JSON.stringify(e));
  }
 

  return (
    <React.Fragment>
      <ReactGridLayout {...props} onLayoutChange ={(e)=>onLayoutChange(e)}> 
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
