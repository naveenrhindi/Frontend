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
  
  // Excavation Data State
  const [excavationType, setExcavationType] = useState('');
  const [excavationAmount, setExcavationAmount] = useState('');
  
  // Transportation Data State
  const [transportAmount, setTransportAmount] = useState('');
  
  // Equipment Data State
  const [operatingHours, setOperatingHours] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [efficiency, setEfficiency] = useState('');
  
  // Methane Data State
  const [methaneCapture, setMethaneCapture] = useState('');

  const [openAlert, setOpenAlert] = useState(false);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setExcavationType('');
    setExcavationAmount('');
    setTransportAmount('');
    setOperatingHours('');
    setFuelConsumption('');
    setEfficiency('');
    setMethaneCapture('');
    setOpenAlert(false);
  };

  const handleSubmit = () => {
    const inputData = {
      excavation: {
        type: excavationType,
        amount: excavationAmount,
      },
      transportation: {
        amount: transportAmount,
      },
      equipment: {
        operatingHours,
        fuelConsumption,
        efficiency,
      },
      methane: {
        captureRate: methaneCapture,
      },
    };
    console.log('Submitted Data:', inputData);
    setOpenAlert(true);
    setTimeout(handleReset, 2000);
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
          fuelType={excavationType}
          setFuelType={setExcavationType}
          fuelConsumption={excavationAmount}
          setFuelConsumption={setExcavationAmount}
        />
      ),
    },
    {
      label: 'Transportation Data',
      content: (
        <TransportationData
          coalProduction={transportAmount}
          setCoalProduction={setTransportAmount}
        />
      ),
    },
    {
      label: 'Equipment Usage',
      content: (
        <EquipmentData
          electricityUsage={operatingHours}
          setElectricityUsage={setOperatingHours}
          waterUsage={fuelConsumption}
          setWaterUsage={setFuelConsumption}
          emissionLevel={efficiency}
          setEmissionLevel={setEfficiency}
        />
      ),
    },
    {
      label: 'Methane Entrapment',
      content: (
        <MethaneEntrapment
          methaneCapture={methaneCapture}
          setMethaneCapture={setMethaneCapture}
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
                    >
                      {index === steps.length - 1 ? 'Submit' : 'Continue'}
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
          autoHideDuration={2000} 
          onClose={handleCloseAlert}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
          <Alert onClose={handleCloseAlert} severity="success" sx={{ width: '100%' }}>
            Data submitted successfully!
          </Alert>
        </Snackbar>
      </div>
    </ThemeProvider>
  );
};

export default DataInput;
