import Axios from "axios";
import * as actionTypes from "./actionTypes";
import { BASE_EDPOINT } from "../../constants/constants";

export const saveUser = (res) => {
  return {
    type: actionTypes.STORE_USER,
    user: res.user,
  };
};

export const logoutUser = () => {
  return {
    type: actionTypes.LOGOUT_USER,
  };
};

export const storeUser = (email, password) => {
  return (dispatch, getState) => {
    Axios.post(
      `${BASE_EDPOINT}/api/users/login`,
      {
        email: email,
        password: password,
      },
      { withCredentials: true } // to work locally
    ).then((res) => {
      if (res.data.success) {
        dispatch(saveUser(res.data));
      }
      // else {
      //   dispatch(saveUser(null));
      // }
    });
  };
};

export const silentLogin = (userObject) => {
  return {
    type: actionTypes.STORE_USER,
    user: userObject.user,
    token: userObject.token,
  };
};
