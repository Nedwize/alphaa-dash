let idCounter = 0;

export const getId = (idCounter) => {
  idCounter++;
  return idCounter.toString();
};

export const getDimensions = (
  task, i,
  dimensions = { x: 0, y: 0, w: 3, h: 3}
) => {
  return {
    x: dimensions.x,
    y: dimensions.y,
    w: dimensions.w,
    h: dimensions.h,
    i: i.toString(),
    _id: task._id,
    title: task.title,
    description: task.description,
  };
};

export const setTodoLocal = () => {};
