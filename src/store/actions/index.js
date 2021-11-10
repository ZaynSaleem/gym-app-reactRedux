export const addTodo = (id, exercise, startTime, restTime, userid ,key) => {
  // console.log(name,email,num);
  // console.log("Action");
  return (dispatch) => {
    dispatch({
      type: "add",
      payload: { id, exercise, startTime, restTime, userid, key },
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
