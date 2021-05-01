import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility.js";

const initialState = {
  user: null,
  token: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.STORE_USER: {
      localStorage.setItem("user", JSON.stringify({ user: action.user }));
      return updateObject(state, { user: action.user });
    }
    case actionTypes.LOGOUT_USER: {
      localStorage.removeItem("user");
      return updateObject(state, { user: null });
    }
    default:
      return state;
  }
};

export default reducer;
