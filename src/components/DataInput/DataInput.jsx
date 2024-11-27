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
} from '@mui/material';
import FuelInformation from './FuelInformation';
import ProductionData from './ProductionData';
import ResourceUsage from './ResourceUsage';

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
  const [fuelType, setFuelType] = useState('');
  const [fuelConsumption, setFuelConsumption] = useState('');
  const [coalProduction, setCoalProduction] = useState('');
  const [electricityUsage, setElectricityUsage] = useState('');
  const [waterUsage, setWaterUsage] = useState('');
  const [emissionLevel, setEmissionLevel] = useState('');

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setFuelType('');
    setFuelConsumption('');
    setCoalProduction('');
    setElectricityUsage('');
    setWaterUsage('');
    setEmissionLevel('');
  };

  const handleSubmit = () => {
    const inputData = {
      fuelType,
      fuelConsumption,
      coalProduction,
      electricityUsage,
      waterUsage,
      emissionLevel,
    };
    console.log('Submitted Data:', inputData);
    handleReset();
  };

  const steps = [
    {
      label: 'Fuel Information',
      content: (
        <FuelInformation
          fuelType={fuelType}
          setFuelType={setFuelType}
          fuelConsumption={fuelConsumption}
          setFuelConsumption={setFuelConsumption}
        />
      ),
    },
    {
      label: 'Production Data',
      content: (
        <ProductionData
          coalProduction={coalProduction}
          setCoalProduction={setCoalProduction}
        />
      ),
    },
    {
      label: 'Resource Usage',
      content: (
        <ResourceUsage
          electricityUsage={electricityUsage}
          setElectricityUsage={setElectricityUsage}
          waterUsage={waterUsage}
          setWaterUsage={setWaterUsage}
          emissionLevel={emissionLevel}
          setEmissionLevel={setEmissionLevel}
        />
      ),
    },
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="bg-white p-6 rounded-lg shadow-md mt-8 ml-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Data Input</h2>
        <Stepper
          activeStep={activeStep}
          orientation="vertical"
          sx={{
            '& .MuiStepIcon-root': {
              color: '#FFA500', // Default step color
              '&.Mui-active': { color: '#FFA500' }, // Active step color
              '&.Mui-completed': { color: '#32CD32' }, // Completed step color
            },
            '& .MuiStepConnector-line': {
              borderColor: '#32CD32',
              borderWidth: '0 0 0 4px',
            },
            '& .MuiStepConnector-root.Mui-active .MuiStepConnector-line': {
              borderColor: '#32CD32',
              borderWidth: '0 0 0 4px',
            },
            '& .MuiStepConnector-root.Mui-completed .MuiStepConnector-line': {
              borderColor: '#32CD32',
              borderWidth: '0 0 0 4px',
            },
            '& .MuiStep-root:last-child .MuiStepConnector-root': {
              display: 'none',
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
      </div>
    </ThemeProvider>
  );
};

export default DataInput;
