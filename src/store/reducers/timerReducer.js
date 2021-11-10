let initialState = {
  data: [],
};

const TimerReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TIMER":
      // console.log(action.payload);
  

      return {
        ...state,
        data: [action.payload],
      };

    default:
      return state;
  }
};

export default TimerReducer;
