import axios from "axios";
import { authHeader } from "./index";

class ChatService {
  async list_message_by_room(roomName) {
    const header = await authHeader();
    return axios.get("/room/messages", { headers: header, params: { room: roomName } });
  }

  async saveMessage(payload) {
    const header = await authHeader();
    return axios.post("/push_message", payload, { headers: header });
  }
}

export default new ChatService();
