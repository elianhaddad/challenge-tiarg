import axios from 'axios'

const BASE_URL = 'https://jsonplaceholder.typicode.com/'

const API = axios.create({ baseURL: BASE_URL })

export default API
