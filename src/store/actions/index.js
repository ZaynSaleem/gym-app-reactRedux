export const addTodo = (obj) => {
  // console.log(name,email,num);
  // console.log("Action");
  return (dispatch) => {
    dispatch({
      type: "add",
      payload: obj,
    });
  };
};

export const dltTodo = (id) => {
  return (dispatch) => {
    dispatch({
      type: "DELETE",
      payload: id,
    });
  };
};

export const updateTodo = (id, exercise, startTime, restTime) => {
  // console.log(id , "Action Update");
  return (dispatch) => {
    dispatch({
      type: "UPDATE",
      payload: { id, exercise, startTime, restTime},
    });
  };
};
