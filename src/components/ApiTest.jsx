import { useEffect } from 'react';
import runAllTests, { 
    testUserEndpoints, 
    testEmissionEndpoints, 
    testCarbonSinkEndpoints 
} from '../utils/apiTest';

const ApiTest = () => {
    useEffect(() => {
        // Run all tests when component mounts
        runAllTests();
    }, []);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">API Test Component</h1>
            <div className="space-y-4">
                <button
                    onClick={testUserEndpoints}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                >
                    Test User Endpoints
                </button>
                <button
                    onClick={testEmissionEndpoints}
                    className="bg-green-500 text-white px-4 py-2 rounded ml-2"
                >
                    Test Emission Endpoints
                </button>
                <button
                    onClick={testCarbonSinkEndpoints}
                    className="bg-purple-500 text-white px-4 py-2 rounded ml-2"
                >
                    Test Carbon Sink Endpoints
                </button>
                <button
                    onClick={runAllTests}
                    className="bg-red-500 text-white px-4 py-2 rounded ml-2"
                >
                    Run All Tests
                </button>
            </div>
            <div className="mt-4">
                <p>Check the browser console for test results</p>
            </div>
        </div>
    );
};

export default ApiTest;
