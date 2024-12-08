// Constants for validation
const VALIDATION_LIMITS = {
    excavation: {
        coalAmount: {
            min: 0,
            max: 100000, // tonnes
        },
        distance: {
            min: 0,
            max: 1000, // km
        }
    },
    transportation: {
        mode: {
            'Truck': {
                maxSpeed: 60, // km/h
                maxLoad: 40, // tonnes
                maxTripsPerDay: 4, // for long distances (>100km)
                loadingTime: 1, // hours
                unloadingTime: 0.5, // hours
            },
            'Rail': {
                maxSpeed: 100, // km/h
                maxLoad: 2000, // tonnes per train
                maxTripsPerDay: 8, // for long distances
                loadingTime: 2, // hours
                unloadingTime: 1, // hours
            }
        },
        distancePerTrip: {
            min: 0,
            max: 1000, // km
        },
        coalTransported: {
            min: 0,
            max: 50000, // tonnes per day
        }
    },
    equipment: {
        operatingHours: {
            min: 0,
            max: 24, // hours per day
        },
        fuelConsumption: {
            'Excavator': {
                'Diesel': { min: 15, max: 40 }, // L/hr
                'Electric': { min: 100, max: 300 }, // kWh/hr
                'Hybrid': { min: 10, max: 30 } // L/hr
            },
            'Loader': {
                'Diesel': { min: 10, max: 30 }, // L/hr
                'Electric': { min: 80, max: 250 }, // kWh/hr
                'Hybrid': { min: 8, max: 25 } // L/hr
            },
            'Drill': {
                'Diesel': { min: 8, max: 25 }, // L/hr
                'Electric': { min: 60, max: 200 }, // kWh/hr
                'Hybrid': { min: 6, max: 20 } // L/hr
            }
        }
    }
};

// Validate excavation data
export const validateExcavation = (data) => {
    const errors = {};
    
    if (!data.coalAmount && data.coalAmount !== 0) {
        errors.coalAmount = 'Coal amount is required';
    } else if (data.coalAmount < VALIDATION_LIMITS.excavation.coalAmount.min) {
        errors.coalAmount = `Coal amount must be at least ${VALIDATION_LIMITS.excavation.coalAmount.min} tonnes`;
    } else if (data.coalAmount > VALIDATION_LIMITS.excavation.coalAmount.max) {
        errors.coalAmount = `Coal amount cannot exceed ${VALIDATION_LIMITS.excavation.coalAmount.max} tonnes`;
    }

    if (!data.distance && data.distance !== 0) {
        errors.distance = 'Distance is required';
    } else if (data.distance < VALIDATION_LIMITS.excavation.distance.min) {
        errors.distance = `Distance must be at least ${VALIDATION_LIMITS.excavation.distance.min} km`;
    } else if (data.distance > VALIDATION_LIMITS.excavation.distance.max) {
        errors.distance = `Distance cannot exceed ${VALIDATION_LIMITS.excavation.distance.max} km`;
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

// Validate transportation data
export const validateTransportation = (data) => {
    const errors = {};
    const modeConfig = VALIDATION_LIMITS.transportation.mode[data.mode];

    if (!data.mode) {
        errors.mode = 'Transportation mode is required';
    }

    if (!data.coalTransported && data.coalTransported !== 0) {
        errors.coalTransported = 'Coal transported amount is required';
    } else if (data.coalTransported < VALIDATION_LIMITS.transportation.coalTransported.min) {
        errors.coalTransported = `Coal transported must be at least ${VALIDATION_LIMITS.transportation.coalTransported.min} tonnes`;
    } else if (data.coalTransported > VALIDATION_LIMITS.transportation.coalTransported.max) {
        errors.coalTransported = `Coal transported cannot exceed ${VALIDATION_LIMITS.transportation.coalTransported.max} tonnes per day`;
    }

    if (!data.distancePerTrip && data.distancePerTrip !== 0) {
        errors.distancePerTrip = 'Distance per trip is required';
    } else if (data.distancePerTrip < VALIDATION_LIMITS.transportation.distancePerTrip.min) {
        errors.distancePerTrip = `Distance per trip must be at least ${VALIDATION_LIMITS.transportation.distancePerTrip.min} km`;
    } else if (data.distancePerTrip > VALIDATION_LIMITS.transportation.distancePerTrip.max) {
        errors.distancePerTrip = `Distance per trip cannot exceed ${VALIDATION_LIMITS.transportation.distancePerTrip.max} km`;
    }

    if (modeConfig && data.distancePerTrip && data.tripsPerDay) {
        const roundTripTime = (2 * data.distancePerTrip / modeConfig.maxSpeed) + 
                            modeConfig.loadingTime + modeConfig.unloadingTime;
        const theoreticalMaxTrips = Math.floor(24 / roundTripTime);
        const practicalMaxTrips = Math.min(theoreticalMaxTrips, modeConfig.maxTripsPerDay);

        if (data.tripsPerDay > practicalMaxTrips) {
            errors.tripsPerDay = `Maximum possible trips per day for ${data.mode} at ${data.distancePerTrip}km is ${practicalMaxTrips}`;
        }

        const maxDailyCapacity = modeConfig.maxLoad * data.tripsPerDay;
        if (data.coalTransported > maxDailyCapacity) {
            errors.coalTransported = `Maximum daily transportation capacity for ${data.mode} with ${data.tripsPerDay} trips is ${maxDailyCapacity} tonnes`;
        }
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

// Validate equipment usage data
export const validateEquipment = (data) => {
    const errors = {};
    
    if (!data.operatingHours && data.operatingHours !== 0) {
        errors.operatingHours = 'Operating hours is required';
    } else if (data.operatingHours < VALIDATION_LIMITS.equipment.operatingHours.min) {
        errors.operatingHours = `Operating hours must be at least ${VALIDATION_LIMITS.equipment.operatingHours.min}`;
    } else if (data.operatingHours > VALIDATION_LIMITS.equipment.operatingHours.max) {
        errors.operatingHours = `Operating hours cannot exceed ${VALIDATION_LIMITS.equipment.operatingHours.max} hours per day`;
    }

    if (data.type && data.fuelType) {
        const consumptionLimits = VALIDATION_LIMITS.equipment.fuelConsumption[data.type]?.[data.fuelType];
        if (consumptionLimits) {
            if (!data.fuelConsumptionPerHour && data.fuelConsumptionPerHour !== 0) {
                errors.fuelConsumptionPerHour = 'Fuel consumption per hour is required';
            } else if (data.fuelConsumptionPerHour < consumptionLimits.min) {
                errors.fuelConsumptionPerHour = `Fuel consumption for ${data.type} using ${data.fuelType} must be at least ${consumptionLimits.min} ${data.fuelType === 'Electric' ? 'kWh/hr' : 'L/hr'}`;
            } else if (data.fuelConsumptionPerHour > consumptionLimits.max) {
                errors.fuelConsumptionPerHour = `Fuel consumption for ${data.type} using ${data.fuelType} cannot exceed ${consumptionLimits.max} ${data.fuelType === 'Electric' ? 'kWh/hr' : 'L/hr'}`;
            }
        }
    } else {
        if (!data.type) errors.type = 'Equipment type is required';
        if (!data.fuelType) errors.fuelType = 'Fuel type is required';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};

// Validate methane entrapment data
export const validateMethane = (data) => {
    const errors = {};
    
    if (!data.captureRate && data.captureRate !== 0) {
        errors.captureRate = 'Capture rate is required';
    } else if (data.captureRate < 0) {
        errors.captureRate = 'Capture rate cannot be negative';
    } else if (data.captureRate > 100) {
        errors.captureRate = 'Capture rate cannot exceed 100%';
    }

    if (!data.dischargeAmount && data.dischargeAmount !== 0) {
        errors.dischargeAmount = 'Discharge amount is required';
    } else if (data.dischargeAmount < 0) {
        errors.dischargeAmount = 'Discharge amount cannot be negative';
    }

    if (!data.conversionEfficiency && data.conversionEfficiency !== 0) {
        errors.conversionEfficiency = 'Conversion efficiency is required';
    } else if (data.conversionEfficiency < 0) {
        errors.conversionEfficiency = 'Conversion efficiency cannot be negative';
    } else if (data.conversionEfficiency > 100) {
        errors.conversionEfficiency = 'Conversion efficiency cannot exceed 100%';
    }

    return { isValid: Object.keys(errors).length === 0, errors };
};
