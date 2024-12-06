import api from '../config';

export const emissionService = {
    getAllEmissions: async () => {
        try {
            const response = await api.get('/emissions');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addEmission: async (emissionData) => {
        try {
            const response = await api.post('/emissions', emissionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateEmission: async (id, emissionData) => {
        try {
            const response = await api.put(`/emissions/${id}`, emissionData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteEmission: async (id) => {
        try {
            const response = await api.delete(`/emissions/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    uploadEmissionFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await api.post('/emissions/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    }
};
