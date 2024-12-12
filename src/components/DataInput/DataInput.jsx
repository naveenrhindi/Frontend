import React, { useState } from 'react';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Paper,
  Typography,
  Box,
  createTheme,
  ThemeProvider,
  Alert,
  AlertTitle,
  Snackbar,
  TextField
} from '@mui/material';
import ExcavationData from './ExcavationData';
import TransportationData from './TransportationData';
import EquipmentData from './EquipmentData';
import MethaneEntrapment from './MethaneEntrapment';
import axios from 'axios';
import { validateExcavation, validateTransportation, validateEquipment, validateMethane } from '../../utils/validations';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useNavigate } from 'react-router-dom';

// Custom theme for orange and green colors
const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500', // Orange
      light: '#FFD9B3', // Light orange
    },
    secondary: {
      main: '#32CD32', // Green
    },
  },
});

const DataInput = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form Data State
  const [formData, setFormData] = useState({
    excavation: {
      coalAmount: '',
      method: '',
      fuelType: '',
      distance: '',
      equipmentUsed: ''
    },
    transportation: {
      coalTransported: '',
      mode: '',
      fuelType: '',
      distancePerTrip: '',
      vehicleCapacity: '',
      tripsPerDay: ''
    },
    equipmentUsage: {
      type: '',
      fuelType: '',
      operatingHours: '',
      fuelConsumptionPerHour: ''
    },
    methaneEntrapment: {
      captureRate: '',
      utilizationMethod: '',
      dischargeAmount: '',
      conversionEfficiency: ''
    },
    emissionDate: new Date()
  });

  const [openAlert, setOpenAlert] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('success');
  const [alertMessage, setAlertMessage] = useState('');

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setFormData({
      excavation: {
        coalAmount: '',
        method: '',
        fuelType: '',
        distance: '',
        equipmentUsed: ''
      },
      transportation: {
        coalTransported: '',
        mode: '',
        fuelType: '',
        distancePerTrip: '',
        vehicleCapacity: '',
        tripsPerDay: ''
      },
      equipmentUsage: {
        type: '',
        fuelType: '',
        operatingHours: '',
        fuelConsumptionPerHour: ''
      },
      methaneEntrapment: {
        captureRate: '',
        utilizationMethod: '',
        dischargeAmount: '',
        conversionEfficiency: ''
      },
      emissionDate: new Date()
    });
    setOpenAlert(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Validate all sections
    const excavationValidation = validateExcavation(formData.excavation);
    const transportationValidation = validateTransportation(formData.transportation);
    const equipmentValidation = validateEquipment(formData.equipmentUsage);
    const methaneValidation = validateMethane(formData.methaneEntrapment);

    // Collect all validation errors
    const validationErrors = {};
    
    if (!excavationValidation.isValid) {
      validationErrors.excavation = excavationValidation.errors;
    }
    if (!transportationValidation.isValid) {
      validationErrors.transportation = transportationValidation.errors;
    }
    if (!equipmentValidation.isValid) {
      validationErrors.equipment = equipmentValidation.errors;
    }
    if (!methaneValidation.isValid) {
      validationErrors.methane = methaneValidation.errors;
    }

    // Check if there are any validation errors
    if (Object.keys(validationErrors).length > 0) {
      setError({
        message: 'Please correct the following errors:',
        details: validationErrors
      });
      setIsSubmitting(false);
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Debug log: Initial equipment data
      console.log('Raw Equipment Data:', formData.equipmentUsage);

      const token = localStorage.getItem('token');
      if (!token) {
        setAlertSeverity('error');
        setAlertMessage('Please login to submit data');
        setOpenAlert(true);
        return;
      }

      // Create submission data with number conversions for all numeric fields
      const submissionData = {
        ...formData,
        excavation: {
          ...formData.excavation,
          coalAmount: parseFloat(formData.excavation.coalAmount) || 0,
          distance: parseFloat(formData.excavation.distance) || 0
        },
        transportation: {
          ...formData.transportation,
          coalTransported: parseFloat(formData.transportation.coalTransported) || 0,
          distancePerTrip: parseFloat(formData.transportation.distancePerTrip) || 0,
          vehicleCapacity: parseFloat(formData.transportation.vehicleCapacity) || 0,
          tripsPerDay: parseFloat(formData.transportation.tripsPerDay) || 0
        },
        equipmentUsage: {
          ...formData.equipmentUsage,
          operatingHours: parseFloat(formData.equipmentUsage.operatingHours) || 0,
          fuelConsumptionPerHour: parseFloat(formData.equipmentUsage.fuelConsumptionPerHour) || 0
        },
        methaneEntrapment: {
          ...formData.methaneEntrapment,
          captureRate: parseFloat(formData.methaneEntrapment.captureRate) || 0,
          dischargeAmount: parseFloat(formData.methaneEntrapment.dischargeAmount) || 0,
          conversionEfficiency: parseFloat(formData.methaneEntrapment.conversionEfficiency) || 0
        }
      };

      // Debug log: Converted data
      console.log('All Converted Data:', {
        excavation: submissionData.excavation,
        transportation: submissionData.transportation,
        equipmentUsage: submissionData.equipmentUsage,
        methaneEntrapment: submissionData.methaneEntrapment
      });

      const baseURL = 'http://localhost:5001';

      // Debug log: Full submission data
      console.log('Full Submission Data:', submissionData);

      const submitResponse = await axios.post(
        `${baseURL}/api/emissions/add-emissions`,
        submissionData,
        {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      // Debug log: Submit response
      console.log('Submit Response:', submitResponse.data);

      if (submitResponse.data) {
        const calculationResponse = await axios.get(
          `${baseURL}/api/emissions/calculate-emissions`,
          {
            headers: {
              'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
            }
          }
        );

        // Debug log: Calculation response
        console.log('Calculation Response:', calculationResponse.data);

        if (calculationResponse.data) {
          const getCalculationsResponse = await axios.get(
            `${baseURL}/api/emissions/get-emission-calculations`,
            {
              headers: {
                'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
              }
            }
          );

          // Debug log: Final calculations
          console.log('Final Calculations:', getCalculationsResponse.data);

          setAlertSeverity('success');
          setAlertMessage('Data submitted and calculations completed successfully!');
          setOpenAlert(true);

          const calculationEvent = new CustomEvent('emissionCalculated', {
            detail: getCalculationsResponse.data
          });
          window.dispatchEvent(calculationEvent);

          setTimeout(() => {
            navigate('/dashboard', { state: { newEmissionData: formData } });
          }, 2000);
        }
      }
    } catch (err) {
      console.error('Submission error:', err);
      setAlertSeverity('error');

      if (!localStorage.getItem('token')) {
        setAlertMessage('Please login to submit data');
      } else if (err.response?.status === 400) {
        setAlertMessage('Invalid or expired token. Please login again.');
      } else if (err.code === 'ECONNABORTED') {
        setAlertMessage('Connection timeout. Please try again.');
      } else if (!err.response) {
        setAlertMessage('Network error. Please check your connection.');
      } else if (err.response.status === 404) {
        setAlertMessage('API endpoint not found. Please contact support.');
      } else if (err.response.status === 401) {
        setAlertMessage('Authentication failed. Please login again.');
      } else {
        setAlertMessage(err.response?.data?.error || 'Error submitting data. Please try again.');
      }

      setError(err.response?.data?.error || 'Error submitting emission data');
      setOpenAlert(true);
    } finally {
      setLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
  };

  const ValidationErrors = ({ errors }) => {
    if (!errors || Object.keys(errors).length === 0) return null;
    
    return (
      <Box sx={{ mt: 2, mb: 2 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          <AlertTitle>Validation Errors</AlertTitle>
          {Object.entries(errors).map(([section, sectionErrors]) => (
            <div key={section}>
              <Typography variant="subtitle2" sx={{ fontWeight: 'bold', mt: 1 }}>
                {section.charAt(0).toUpperCase() + section.slice(1)}:
              </Typography>
              <ul style={{ margin: '4px 0', paddingLeft: '20px' }}>
                {Object.entries(sectionErrors).map(([field, message]) => (
                  <li key={field}>{message}</li>
                ))}
              </ul>
            </div>
          ))}
        </Alert>
      </Box>
    );
  };

  const steps = [
    {
      label: 'Excavation Data',
      content: (
        <ExcavationData
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      label: 'Transportation Data',
      content: (
        <TransportationData
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      label: 'Equipment Usage',
      content: (
        <EquipmentData
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
    {
      label: 'Methane Entrapment',
      content: (
        <MethaneEntrapment
          formData={formData}
          setFormData={setFormData}
        />
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 ml-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Mining Operation Data Input</h2>
        
        {/* Show validation errors if any */}
        {error && error.details && <ValidationErrors errors={error.details} />}
        
        <Box sx={{ mb: 4 }}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Emission Date"
              value={formData.emissionDate}
              onChange={(newValue) => {
                setFormData(prev => ({
                  ...prev,
                  emissionDate: newValue
                }));
              }}
              renderInput={(params) => <TextField {...params} fullWidth />}
              maxDate={new Date()} // Restrict to today or earlier
              inputFormat="dd/MM/yyyy" // Set the desired format
              sx={{ width: '100%' }}
            />
          </LocalizationProvider>
        </Box>

        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            '& .MuiStepIcon-root': {
              color: '#FFA500',
              transition: 'all 0.3s ease-in-out',
              '&.Mui-active': { 
                color: '#FFA500',
                transform: 'scale(1.2)',
              },
              '&.Mui-completed': { 
                color: '#32CD32',
                animation: 'pulse 0.5s ease-in-out',
              },
            },
            '& .MuiStepConnector-line': {
              borderColor: '#E0E0E0',
              borderWidth: '0 0 0 2px',
              transition: 'all 0.4s ease-in-out',
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: '#32CD32',
              borderWidth: '0 0 0 2px',
              animation: 'slideDown 0.5s ease-in-out',
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: '#32CD32',
              borderWidth: '0 0 0 2px',
            },
            '& .MuiStepConnector-root': {
              marginLeft: '12px',
            },
            '& .MuiStepConnector-root.Mui-disabled .MuiStepConnector-line': {
              borderColor: '#E0E0E0',
              borderWidth: '0 0 0 2px',
            },
            '& .MuiStepLabel-label': {
              transition: 'color 0.3s ease-in-out',
              '&.Mui-active': {
                color: '#FFA500',
                fontWeight: 'bold',
              },
              '&.Mui-completed': {
                color: '#32CD32',
              },
            },
            '@keyframes pulse': {
              '0%': {
                transform: 'scale(1)',
              },
              '50%': {
                transform: 'scale(1.2)',
              },
              '100%': {
                transform: 'scale(1)',
              },
            },
            '@keyframes slideDown': {
              '0%': {
                height: '0%',
                opacity: 0,
              },
              '100%': {
                height: '100%',
                opacity: 1,
              },
            },
          }}
        >
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
              <StepContent>
                <div className="mb-4">{step.content}</div>
                <Box sx={{ mb: 2 }}>
                  <div>
                    <Button
                      variant="outlined"
                      onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                      sx={{
                        mt: 1,
                        mr: 1,
                        color: '#32CD32',
                        borderColor: '#32CD32',
                        '&:hover': {
                          bgcolor: '#32CD32',
                          borderColor: '#32CD32',
                          color: 'white',
                        },
                      }}
                      disabled={loading || isSubmitting}
                    >
                      {index === steps.length - 1 ? (loading || isSubmitting ? 'Submitting...' : 'Submit') : 'Continue'}
                    </Button>
                    <Button
                      variant="text"
                      disabled={index === 0}
                      onClick={handleBack}
                      sx={{
                        mt: 1,
                        mr: 1,
                        color: '#FFA500',
                        '&:hover': {
                          bgcolor: 'rgba(255, 165, 0, 0.04)',
                        },
                        '&.Mui-disabled': {
                          color: 'rgba(255, 165, 0, 0.4)',
                        },
                      }}
                    >
                      Back
                    </Button>
                  </div>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper
            square
            elevation={0}
            sx={{
              p: 3,
              bgcolor: 'rgba(144, 238, 144, 0.1)', // Pale green background
              border: '1px solid #32CD32', // Green border
            }}
          >
            <Typography sx={{ color: '#32CD32' }}>
              All steps completed - Data has been submitted!
            </Typography>
            <Button
              variant="outlined"
              onClick={handleReset}
              sx={{
                mt: 1,
                mr: 1,
                color: '#32CD32',
                borderColor: '#32CD32',
                '&:hover': {
                  bgcolor: 'rgba(50, 205, 50, 0.04)',
                  borderColor: '#32CD32',
                },
              }}
            >
              Reset
            </Button>
          </Paper>
        )}

        <Snackbar 
          open={openAlert} 
          autoHideDuration={6000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseAlert} 
            severity={alertSeverity}
            sx={{ width: '100%' }}
          >
            {alertMessage}
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default DataInput;
