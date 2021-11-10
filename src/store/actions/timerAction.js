export const countDown = (countdown, type, exerciseName) => {
  //  console.log(countdown , "action");
  return (dispatch) => {
    dispatch({
      type: "TIMER",
      payload: { countdown, type, exerciseName },
    });
  };
};
