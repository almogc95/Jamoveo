import axios from 'axios';

//TODO
// let API_URL;

// process.env.PROJECT_MODE === 'production' ?
//     API_URL = process.env.REACT_APP_BACKEND_URL :
//     API_URL = 'http://localhost:8080'

const axiosHTTPrequests = axios.create({
    baseURL: 'https://jamoveo-backend-al1u.onrender.com'
});

export default axiosHTTPrequests;