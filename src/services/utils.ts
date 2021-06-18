let idCounter = 0;

export const getId = (idCounter: number) => {
  idCounter++;
  return idCounter.toString();
};

export interface Dimension {
  i: string;
  _id: string;
  title: string;
  description: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export const getDimensions = (
  task: any,
  i: number,
  dimensions = { x: 0, y: 0, w: 3, h: 3 }
): Dimension => {
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
