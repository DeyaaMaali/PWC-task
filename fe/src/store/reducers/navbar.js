const initialState = {
  sidebarShow: "responsive"
};

const reducer = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case "set":
      return { ...state, ...rest };
    case "login":
      return { ...state, ...rest };
    default:
      return state;
  }
};

export default reducer;
