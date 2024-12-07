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
  Snackbar,
} from '@mui/material';
import ExcavationData from './ExcavationData';
import TransportationData from './TransportationData';
import EquipmentData from './EquipmentData';
import MethaneEntrapment from './MethaneEntrapment';
import axios from 'axios';

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
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
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
    }
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
      }
    });
    setOpenAlert(false);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      
      const token = localStorage.getItem('token');
      if (!token) {
        setAlertSeverity('error');
        setAlertMessage('Please login to submit data');
        setOpenAlert(true);
        return;
      }

      const baseURL = 'http://localhost:5001';
      
      // Step 1: Submit emission data
      const submitResponse = await axios.post(
        `${baseURL}/api/emissions/add-emissions`,
        formData,
        {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (submitResponse.data) {
        // Step 2: Trigger emission calculations
        const calculationResponse = await axios.get(
          `${baseURL}/api/emissions/calculate-emissions`,
          {
            headers: {
              'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
            }
          }
        );

        if (calculationResponse.data) {
          // Step 3: Get the calculated results
          const getCalculationsResponse = await axios.get(
            `${baseURL}/api/emissions/get-emission-calculations`,
            {
              headers: {
                'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
              }
            }
          );

          setAlertSeverity('success');
          setAlertMessage('Data submitted and calculations completed successfully!');
          setOpenAlert(true);
          
          // Emit event with calculation results for visualization
          const calculationEvent = new CustomEvent('emissionCalculated', {
            detail: getCalculationsResponse.data
          });
          window.dispatchEvent(calculationEvent);
          
          setTimeout(handleReset, 2000);
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
    }
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenAlert(false);
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
                      disabled={loading}
                    >
                      {index === steps.length - 1 ? (loading ? 'Submitting...' : 'Submit') : 'Continue'}
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
