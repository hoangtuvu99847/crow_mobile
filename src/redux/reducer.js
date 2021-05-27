import { LOGIN, LOGOUT, SET_CURRENT_USER_APP, SET_USER_ROOM } from "./actionType";
import { actionSetUserInRoom } from "./action";

const initialState = {
  user: {},
  isLogin: null,
  userInRoom: [],
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
    // let result = [];
    // responseServerReceived.map(item => {
    //   Object.keys(socketDataReceived).includes(item.name) ?
    //     item["numberUser"] = socketDataReceived[item.name].length
    //     : item["numberUser"] = 0;
    //   console.log("===> USER IN ROOM: ", item);
    //   result.push(item);
    // });
    // setRooms(result);
    case SET_USER_ROOM:
      console.log('SET_USER_ROOM: ', action.payload);
      const {payload} = action
      return {
        ...state,
        userInRoom: payload.responseData.map(item => {
          Object.keys(payload.socketData).includes(item.name) ?
              item["numberUser"] = payload.socketData[item.name].length
              : item["numberUser"] = 0;
            console.log("===> USER IN ROOM: ", item);
            return item
        }),
      };
    default:
      return state;
  }
}
