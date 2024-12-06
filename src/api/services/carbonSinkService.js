import api from '../config';

export const carbonSinkService = {
    getAllCarbonSinks: async () => {
        try {
            const response = await api.get('/carbon-sinks');
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    addCarbonSink: async (sinkData) => {
        try {
            const response = await api.post('/carbon-sinks', sinkData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    updateCarbonSink: async (id, sinkData) => {
        try {
            const response = await api.put(`/carbon-sinks/${id}`, sinkData);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    deleteCarbonSink: async (id) => {
        try {
            const response = await api.delete(`/carbon-sinks/${id}`);
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    },

    uploadCarbonSinkFile: async (file) => {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await api.post('/carbon-sinks/upload', formData, {
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
