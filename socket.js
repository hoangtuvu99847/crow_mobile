import { io } from "socket.io-client";
import { SERVER_HOST, SOCKET_PORT } from "@env";

const URL = `http://${SERVER_HOST}:${SOCKET_PORT}`;
const socket = io(URL, { autoConnect: false, transports: ["websocket"] });

socket.onAny((evt, ...args) => {
  console.log("===> EVENT_NAME: " + evt, args);
});
export default socket;
