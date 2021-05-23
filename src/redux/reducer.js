import { LOGIN, LOGOUT, SET_CURRENT_USER_APP } from "./actionType";

const initialState = {
  user: {},
  isLogin: null,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isLogin: true,
      };
    case SET_CURRENT_USER_APP:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLogin: false,
      };
    default:
      return state;
  }
}
