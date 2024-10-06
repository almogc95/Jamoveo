import axios from 'axios';

console.log("process.env.PROJECT_MODE", process.env.PROJECT_MODE)
const API_URL = process.env.PROJECT_MODE === 'production'
    ? process.env.REACT_APP_BACKEND_URL
    : 'http://localhost:8080'

const axiosHTTPrequests = axios.create({
    baseURL: API_URL
});
console.log('API_URL:', API_URL);

export default axiosHTTPrequests;