const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Emission = require('../models/Emission');

// ... your existing routes ...

// Get emissions for a specific user filtered by year and month
router.get('/user-emissions', auth, async (req, res) => {
    try {
        const { year, month } = req.query;
        
        // Create date range for the specified month and year
        const startDate = new Date(year, month - 1, 1);
        const endDate = new Date(year, month, 0); // Last day of the month

        // Find all emissions for the user within the date range
        const emissions = await Emission.find({
            userId: req.user.id,
            emissionDate: {
                $gte: startDate,
                $lte: endDate
            }
        }).sort({ emissionDate: 1 });

        res.json(emissions);
    } catch (err) {
        console.error('Error fetching user emissions:', err);
        res.status(500).json({ error: 'Error fetching emissions data' });
    }
});

// Add backdated emission data
router.post('/backdate-emission', auth, async (req, res) => {
    try {
        const {
            date,
            excavation,
            transportation,
            equipmentUsage,
            methaneEntrapment
        } = req.body;

        // Create new emission entry
        const newEmission = new Emission({
            userId: req.user.id,
            emissionDate: new Date(date),
            excavation: {
                coalAmount: excavation,
                method: 'Historical',
                fuelType: 'Not Specified',
                distance: 0,
                equipmentUsed: 'Not Specified'
            },
            transportation: {
                coalTransported: transportation,
                mode: 'Historical',
                fuelType: 'Not Specified',
                distancePerTrip: 0,
                vehicleCapacity: 0,
                tripsPerDay: 0
            },
            equipmentUsage: {
                type: 'Historical',
                fuelType: 'Not Specified',
                operatingHours: equipmentUsage,
                fuelConsumptionPerHour: 0
            },
            methaneEntrapment: {
                captureRate: methaneEntrapment,
                utilizationMethod: 'Historical',
                dischargeAmount: 0,
                conversionEfficiency: 0
            }
        });

        await newEmission.save();
        res.json({ message: 'Historical emission data added successfully' });
    } catch (err) {
        console.error('Error adding historical emission:', err);
        res.status(500).json({ error: 'Error adding historical emission data' });
    }
});

module.exports = router;
