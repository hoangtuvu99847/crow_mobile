import axios from "axios";
import { actionLogout } from "./redux/action";
import store from "./redux/index";

export function initialize() {
    axios.defaults.baseURL = "http://192.168.0.14:3333/"
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            store.dispatch(actionLogout)
            // Remove from AsyncStorage

        }

        return Promise.reject(error);
    });

}