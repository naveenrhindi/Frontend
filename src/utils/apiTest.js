import axios from 'axios';

// Configure axios with base URL and default headers
const api = axios.create({
    baseURL: 'http://localhost:5001/api',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Add request interceptor to include auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Test function for user endpoints
export const testUserEndpoints = async () => {
    try {
        console.log('Testing User Endpoints...');
        
        // Test login
        const loginResponse = await api.post('/users/login', {
            email: 'test@example.com',
            password: 'password123'
        });
        console.log('Login Response:', loginResponse.data);
        
        // Store token
        if (loginResponse.data.token) {
            localStorage.setItem('token', loginResponse.data.token);
        }
        
    } catch (error) {
        console.error('User Endpoints Error:', error.response?.data || error.message);
    }
};

// Test function for emission endpoints
export const testEmissionEndpoints = async () => {
    try {
        console.log('Testing Emission Endpoints...');
        
        // Test adding emission
        const emissionData = {
            excavation: {
                coalAmount: 700,
                method: "Open-Cast",
                fuelType: "Diesel",
                distance: 200,
                equipmentUsed: "Excavators"
            },
            transportation: {
                coalTransported: 700,
                mode: "Dump Truck",
                fuelType: "Diesel",
                distancePerTrip: 10,
                vehicleCapacity: 50,
                tripsPerDay: 10
            },
            equipmentUsage: {
                type: "Excavator",
                fuelType: "Diesel",
                operatingHours: 8,
                fuelConsumptionPerHour: 15
            },
            methaneEntrapment: {
                captureRate: 100,
                utilizationMethod: "Energy Generation",
                dischargeAmount: 50,
                conversionEfficiency: 90
            }
        };
        
        const addEmissionResponse = await api.post('/emissions/add-emissions', emissionData);
        console.log('Add Emission Response:', addEmissionResponse.data);
        
        // Test getting emissions
        const getEmissionsResponse = await api.get('/emissions/get-emissions');
        console.log('Get Emissions Response:', getEmissionsResponse.data);
        
    } catch (error) {
        console.error('Emission Endpoints Error:', error.response?.data || error.message);
    }
};

// Test function for carbon sink endpoints
export const testCarbonSinkEndpoints = async () => {
    try {
        console.log('Testing Carbon Sink Endpoints...');
        
        // Test adding carbon sink (Afforestation)
        const afforestationData = {
            type: "Afforestation",
            location: "North Zone",
            creationDate: new Date().toISOString(),
            afforestation: {
                area: 400,
                treePlantingRate: 500,
                treeType: "broadleaf"
            }
        };
        
        const addAfforestationResponse = await api.post('/carbon-sinks/add-carbon-sink', afforestationData);
        console.log('Add Afforestation Response:', addAfforestationResponse.data);
        
        // Test adding carbon sink (Green Technology)
        const greenTechData = {
            type: "Green Technology",
            location: "South Zone",
            creationDate: new Date().toISOString(),
            greenTechnology: {
                technologyType: "Solar Panels",
                emissionReduction: 150,
                energySource: "Solar"
            }
        };
        
        const addGreenTechResponse = await api.post('/carbon-sinks/add-carbon-sink', greenTechData);
        console.log('Add Green Tech Response:', addGreenTechResponse.data);
        
        // Test getting carbon sinks
        const getCarbonSinksResponse = await api.get('/carbon-sinks/get-carbon-sinks');
        console.log('Get Carbon Sinks Response:', getCarbonSinksResponse.data);
        
    } catch (error) {
        console.error('Carbon Sink Endpoints Error:', error.response?.data || error.message);
    }
};

// Run all tests
const runAllTests = async () => {
    console.log('Starting API Tests...');
    
    // First login to get token
    await testUserEndpoints();
    
    // Then test other endpoints that require authentication
    await testEmissionEndpoints();
    await testCarbonSinkEndpoints();
    
    console.log('API Tests Completed!');
};

// Export the test runner
export default runAllTests;
