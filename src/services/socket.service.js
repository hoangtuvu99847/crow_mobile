import axios from "axios";
import { authHeader } from "./index";

class SocketService {
  async joinRoom(payload) {
    const header = await authHeader();
    return axios.post("/socket/join", payload, { headers: header });
  }

  async leaveRoom(payload) {
    const header = await authHeader();
    return axios.post("/socket/leave", payload, { headers: header });
  }
}

export default new SocketService();
