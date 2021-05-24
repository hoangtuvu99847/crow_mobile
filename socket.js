import {io} from "socket.io-client";

const URL = "http://192.168.1.180:5000"
const socket = io(URL, { autoConnect: false, transports: ["websocket"] })

socket.onAny((evt, ...args) => {
    console.log('===> EVENT_NAME: ' + evt, args);
})
export default socket
