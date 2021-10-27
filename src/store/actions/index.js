export const addTodo = (id, name, email, num) => {
  // console.log(name,email,num);
  return (dispatch) => {
    dispatch({
      type: "add",
      payload: { id,name, email, num },
    });
  };
};

export const dltTodo = (id) => {
  return(dispatch) => {
    dispatch({
      type: "DELETE",
      payload: id
    })
  }
}

export const updateTodo = (id,name,email,num) => {
  return(dispatch) => {
    dispatch({
      type: "UPDATE",
      payload: {id,name,email,num}
    })
  }
}
