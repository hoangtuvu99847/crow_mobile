import { LOGIN, LOGOUT, SET_CURRENT_USER_APP, SET_USER_ROOM } from "./actionType";

export const actionLogin = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};
export const actionLogout = () => {
  return {
    type: LOGOUT,
  };
};
export const actionSetCurrentUser = (payload) => {
  return {
    type: SET_CURRENT_USER_APP,
    payload: payload,
  };
};
export const actionSetUserInRoom = (payload) => {
  return {
    type: SET_USER_ROOM,
    payload: payload,
  };
};
