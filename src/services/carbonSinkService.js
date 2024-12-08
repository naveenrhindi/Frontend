import api from './api';

// Add multiple carbon sinks
export const addMultipleCarbonSinks = async (sinksData) => {
    try {
        const response = await api.post('/carbon-sinks/add-multiple-carbon-sinks', sinksData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Add single carbon sink
export const addCarbonSink = async (sinkData) => {
    try {
        const response = await api.post('/carbon-sinks/add-carbon-sink', sinkData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Update carbon sink
export const updateCarbonSink = async (id, sinkData) => {
    try {
        const response = await api.put(`/carbon-sinks/update-carbon-sink/${id}`, sinkData);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Get all carbon sinks
export const getCarbonSinks = async () => {
    try {
        const response = await api.get('/carbon-sinks/get-carbon-sinks');
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

// Delete carbon sink
export const deleteCarbonSink = async (id) => {
    try {
        const response = await api.delete(`/carbon-sinks/delete-carbon-sink/${id}`);
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};
