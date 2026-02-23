import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api.eumelos-ai.demo/v1', // Placeholder URL
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor to add auth token in the future
api.interceptors.request.use((config) => {
    const user = JSON.parse(localStorage.getItem('eumelos_user'));
    if (user && user.token) {
        config.headers.Authorization = `Bearer ${user.token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export const courseService = {
    getAll: () => api.get('/courses'),
    getById: (id) => api.get(`/courses/${id}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
};

export const authService = {
    login: (credentials) => api.post('/auth/login', credentials),
    register: (userData) => api.post('/auth/register', userData),
};

export default api;
