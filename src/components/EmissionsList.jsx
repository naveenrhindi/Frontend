import React, { useState, useEffect } from 'react';
import { emissionService } from '../api/services/emissionService';

const EmissionsList = () => {
    const [emissions, setEmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchEmissions();
    }, []);

    const fetchEmissions = async () => {
        try {
            setLoading(true);
            const data = await emissionService.getAllEmissions();
            setEmissions(data);
            setError(null);
        } catch (err) {
            setError(err.message || 'Failed to fetch emissions');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Emissions Data</h2>
            <div className="emissions-list">
                {emissions.map((emission) => (
                    <div key={emission.id} className="emission-item">
                        <h3>{emission.source}</h3>
                        <p>Amount: {emission.amount}</p>
                        <p>Date: {new Date(emission.date).toLocaleDateString()}</p>
                        <p>Type: {emission.type}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default EmissionsList;
