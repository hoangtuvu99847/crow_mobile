import {io} from "socket.io-client";

const URL = "http://192.168.241.208:5001"
const socket = io(URL, { autoConnect: false, transports: ["websocket"] })

socket.onAny((evt, ...args) => {
    console.log(evt, args);
})
export default socket