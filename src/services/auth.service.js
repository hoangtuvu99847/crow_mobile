import axios from 'axios';

export const requestLogin = data => {
  return axios.post('/login', data);
};
