import axios from "axios"

export const requestGetListRoom = () => {
    return axios.get('/room')
}