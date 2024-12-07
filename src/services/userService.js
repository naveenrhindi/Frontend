import api from './api';

// User registration
export const registerUser = async (userData) => {
    try {
        const response = await api.post('/users/register', userData);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Registration error:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Registration failed. Please try again.');
    }
};

// User login
export const loginUser = async (credentials) => {
    try {
        const response = await api.post('/users/login', credentials);
        if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Login error:', error);
        if (error.response && error.response.data) {
            throw new Error(error.response.data.message || 'Invalid email or password');
        }
        throw new Error('Login failed. Please try again.');
    }
};

// Update user profile
export const updateUser = async (userData) => {
    try {
        const response = await api.put('/users/update', userData);
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Update error:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Update failed. Please try again.');
    }
};

// Update user avatar
export const updateAvatar = async (formData) => {
    try {
        const response = await api.post('/users/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        if (response.data.user) {
            localStorage.setItem('user', JSON.stringify(response.data.user));
        }
        return response.data;
    } catch (error) {
        console.error('Avatar update error:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Avatar update failed. Please try again.');
    }
};

// Delete user account
export const deleteAccount = async () => {
    try {
        const response = await api.delete('/users/delete-account');
        logout();
        return response.data;
    } catch (error) {
        console.error('Account deletion error:', error);
        if (error.response && error.response.data) {
            throw error.response.data;
        }
        throw new Error('Account deletion failed. Please try again.');
    }
};

// Helper functions
export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
};

export const getCurrentUser = () => {
    try {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    } catch (error) {
        console.error('Error getting current user:', error);
        return null;
    }
};

export const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token;
};
