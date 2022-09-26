import axios from 'axios'

//colocar no env
const BASE_URL_DEVELOPMENT = "http://localhost:3333";

const api = axios.create({
    baseURL: BASE_URL_DEVELOPMENT
})

export { api };