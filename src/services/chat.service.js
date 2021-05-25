import axios from "axios";
import { authHeader } from "./index";

class ChatService {
  async list() {
    const header = await authHeader();
    return axios.get('/room', {headers: header});
  }
  async saveMessage(payload) {
    const header = await authHeader();
    return axios.post("/push_message", payload, { headers: header });
  }
}

export default new ChatService();
