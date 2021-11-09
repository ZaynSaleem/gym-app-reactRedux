export const login = (id, email) => {
  return (dispatch) => {
    console.log(id, "-----Action----");
    dispatch({
      type: "SIGN_IN",
      payload: { id, email },
    });
  };
};

export const logout = () => {
  return (dispatch) => {
    console.log("logout action");
    dispatch({
      type: "SIGN_OUT",
    });
  };
};
