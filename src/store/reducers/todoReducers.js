let initialState111 = {
  todo: [],
};

const reducer = (state = initialState111, action) => {
  switch (action.type) {
    case "add":
      // console.log(action.payload , "Reducer");
      return {
        ...state,
        todo: [...state.todo, action.payload],
      };
    case "DELETE":
      let dupData = [...state.todo];
      let newArr = dupData.filter((x) => x.id !== action.payload);
      console.log(newArr);
      console.log(action.payload);
      return {
        ...state,
        todo: newArr,
      };
    case "UPDATE":
        // console.log(action.payload);
      let dup = [...state.todo];
      let updated = dup.findIndex((x) => x.id === action.payload.id);
      dup[updated].exercise = action.payload.exercise;
      dup[updated].startTime = action.payload.startTime;
      dup[updated].restTime = action.payload.restTime;

      // console.log(dup);
      return {
        ...state,
        todo: dup,
      };
    default:
      return state;
  }
};

export default reducer;
