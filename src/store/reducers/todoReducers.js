let initialState111 = {
  data: [],
};

const reducer = (state = initialState111, action) => {
  switch (action.type) {
    case "add":
      console.log(action.payload);
      return {
        ...state,
        data: [...state.data, action.payload],
      };
    case "DELETE":
      let dupData = [...state.data];
      let newArr = dupData.filter((x) => x.id !== action.payload);
      console.log(newArr);
      console.log(action.payload);
      return {
        ...state,
        data: newArr,
      };
    case "UPDATE":
      //   console.log(action.payload);
      let dup = [...state.data];
      let updated = dup.findIndex((x) => x.id === action.payload.id);
      dup[updated].name = action.payload.name;
      dup[updated].email = action.payload.email;
      dup[updated].num = action.payload.num;

      console.log(dup);
      return {
        ...state,
        data: dup,
      };
    default:
      return state;
  }
};

export default reducer;
