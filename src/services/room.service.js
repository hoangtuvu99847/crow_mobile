import axios from 'axios';
import {authHeader} from './index';

class RoomService {
  async list() {
    const header = await authHeader();
    return axios.get('/room', {headers: header});
  }
}

export default new RoomService();
