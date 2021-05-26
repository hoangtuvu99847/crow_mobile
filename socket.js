import { io } from "socket.io-client";
import { SERVER_HOST, SERVER_PORT } from "@env";


const URL = `http://${SERVER_HOST}:${SERVER_PORT}`;
const socket = io(URL, { autoConnect: false, transports: ["websocket"] });

socket.onAny((evt, ...args) => {
  console.log("===> EVENT_NAME: " + evt, args);
});
export default socket;
