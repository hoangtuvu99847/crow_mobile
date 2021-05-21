import axios from "axios"

export const requestGetListRoom = () => {
    return axios.get('/room')
}
export const requestLogin = (data) => {
    console.log('UBTPUT: ', data);
    return axios.post('/login', data)
}