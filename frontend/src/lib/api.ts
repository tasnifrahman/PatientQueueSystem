import axios from 'axios';

const BASE_URL = 'http://localhost:3030';

export const api = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        console.error("API Error Intercepted:", error.response?.data || error.message);
        return Promise.reject(error);
    }
);