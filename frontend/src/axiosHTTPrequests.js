import axios from 'axios';

console.log("process.env.REACT_APP_PROJECT_MODE", process.env.REACT_APP_PROJECT_MODE)
const API_URL = process.env.REACT_APP_PROJECT_MODE === 'production'
    ? process.env.REACT_APP_BACKEND_URL
    : 'http://localhost:8080'

const axiosHTTPrequests = axios.create({
    baseURL: API_URL
});
console.log('API_URL:', API_URL);

export default axiosHTTPrequests;