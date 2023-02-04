import axios from "axios"


const baseUrl = 'http://127.0.0.1:8000/api/'

const authApi = {
  register: params => axios.post(`${baseUrl}register`, params),
  login: params =>  axios.post(`${baseUrl}login`, params),
  verifyToken: params => axios.post(`${baseUrl}login`, params)
}

export default authApi
