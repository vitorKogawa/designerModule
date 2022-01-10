import axios from 'axios'

//colocar no env
const BASE_URL_DEVELOPMENT = "http://localhost:8080";

const api = axios.create({
    baseURL: BASE_URL_DEVELOPMENT
})

export { api };