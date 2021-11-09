export const countDown = (time, rest) => {
    console.log(time)
  return (dispatch) => {
    dispatch({
      type: "TIMER",
      payload: { time, rest },
    });
  };
};
