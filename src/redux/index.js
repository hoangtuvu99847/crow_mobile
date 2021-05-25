import { applyMiddleware, createStore } from "redux";
import Reducer from "./reducer";
import thunk from "redux-thunk";

export default createStore(Reducer, applyMiddleware(thunk));
