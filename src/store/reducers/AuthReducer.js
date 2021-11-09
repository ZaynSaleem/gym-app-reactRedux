let initialState = {
  data: [],
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SIGN_IN":
      console.log(action.payload);
      return {
        ...state,
        data: [action.payload],
      };
    case "SIGN_OUT":
      console.log("Signout Reducer");
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
};

export default AuthReducer;
