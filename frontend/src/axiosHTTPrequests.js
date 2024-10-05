import axios from 'axios';


process.env.NODE_ENV === 'production' ?
    API_URL = process.env.REACT_APP_BACKEND_URL :
    API_URL = 'http://localhost:8080'

const axiosHTTPrequests = axios.create({
    baseURL: API_URL
});

export default axiosHTTPrequests;