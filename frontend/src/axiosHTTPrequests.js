import axios from 'axios';

const API_URL = process.env.NODE_ENV === 'production'
    ? 'https://jamoveo-650e.onrender.com' //react app's deployed URL 
    : 'http://localhost:8080';

const axiosHTTPrequests = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default axiosHTTPrequests;