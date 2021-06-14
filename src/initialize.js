import axios from "axios";
import { actionLogout } from "./redux/action";
import store from "./redux/index";
import { SERVER_HOST, SERVER_PORT } from "@env";
import StorageApp from "../utils/storage";


export function initialize() {
  axios.defaults.baseURL = `http://${SERVER_HOST}:${SERVER_PORT}/`;
  axios.interceptors.response.use(null, (error) => {
    if (error.response.status === 401) {
      console.log("== AUTHENTICATION FAILED ==");
      StorageApp.removeValue("user")
        .then(r => store.dispatch(actionLogout()));
    }
    return Promise.reject(error);
  });

}
