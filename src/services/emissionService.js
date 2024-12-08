import api from './api';

// Add new emission
export const addEmission = async (emissionData) => {
    try {
        const response = await api.post('/emissions/add-emissions', emissionData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all emissions
export const getEmissions = async () => {
    try {
        const response = await api.get('/emissions/get-emissions');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update emission
export const updateEmission = async (id, emissionData) => {
    try {
        const response = await api.put(`/emissions/update-emissions/${id}`, emissionData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete emission
export const deleteEmission = async (id) => {
    try {
        const response = await api.delete(`/emissions/delete-emissions/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Calculate emissions
export const calculateEmissions = async () => {
    try {
        const response = await api.get('/emissions/calculate-emissions');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get emission calculations
export const getEmissionCalculations = async () => {
    try {
        const response = await api.get('/emissions/get-emission-calculations');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
