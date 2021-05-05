import {connect} from "socket.io-client";

const URL = "http://127.0.0.1:5001"
const socket = connect(URL, { autoConnect: false, transports: ["websocket"] })

console.log('INIT SOCKET: ', socket);
socket.onAny((evt, ...args) => {
    console.log(evt, args);
})
export default socket