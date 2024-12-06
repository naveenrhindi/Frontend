import api from '../config';

export const authService = {
    login: async (credentials) => {
        try {
            const response = await api.post('/api/users/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    register: async (userData) => {
        try {
            const response = await api.post('/api/users/register', userData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    logout: () => {
        localStorage.removeItem('token');
    },

    getCurrentUser: async () => {
        try {
            const response = await api.get('/api/users/me');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
