import axios from "axios";
import { actionLogout } from "./redux/action";
import store from "./redux/index";

export function initialize() {
    axios.defaults.baseURL = "http://192.168.1.180:5000/"
    axios.interceptors.response.use(null, (error) => {
        if (error.response.status === 401) {
            console.log('== AUTHENTICATION FAILED ==');
            store.dispatch(actionLogout())
            // Remove from AsyncStorage
        }

        return Promise.reject(error);
    });

}
