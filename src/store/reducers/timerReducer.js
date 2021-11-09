let initialState = {
  data: [],
};

const TimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER":
      console.log(action.payload);
      let countdown = action.payload.time;
      let rest = action.payload.rest;
      let timeCountdown = setInterval(() => {
        countdown--;
        console.log(countdown);
        if (countdown === 0) {
          console.log("Ended");
          clearInterval(timeCountdown);
          console.log("Rest");
          let restCountDown = setInterval(() => {
            rest--;
            console.log(rest);
            if (rest === 0) {
              console.log("Ended");
              clearInterval(restCountDown);
            }
          }, 1000);
        }
      }, 1000);

      return {
        // ...state,
        // data: newArr,
      };

    default:
      return state;
  }
};

export default TimerReducer;
