import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button,
  Box,
  createTheme,
  ThemeProvider,
} from '@mui/material';
import { FaTree, FaLeaf, FaMountain } from 'react-icons/fa';
import CarbonSinksInput from './CarbonSinksInput';
import CarbonSinksVisualisation from './CarbonSinksVisualisation';

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

const CarbonSinks = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [showCharts, setShowCharts] = useState(false);
  const [data, setData] = useState({
    afforestation: {
      area: 0,
      plantingRate: 0,
      treeType: 'broadleaf',
      estimatedCarbonSeq: 0
    },
    soilCarbon: {
      area: 0,
      managementType: 'organic',
      estimatedCarbonSeq: 0
    },
    grassland: {
      area: 0,
      grassType: 'native',
      estimatedCarbonSeq: 0
    }
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      setShowCharts(true);
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };
  
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setShowCharts(false);
    setData({
      afforestation: { area: 0, plantingRate: 0, treeType: 'broadleaf', estimatedCarbonSeq: 0 },
      soilCarbon: { area: 0, managementType: 'organic', estimatedCarbonSeq: 0 },
      grassland: { area: 0, grassType: 'native', estimatedCarbonSeq: 0 }
    });
  };

  const calculateCarbonSeq = (type, values) => {
    let seqRate;
    switch(type) {
      case 'afforestation':
        seqRate = values.treeType === 'broadleaf' ? 2.5 : values.treeType === 'evergreen' ? 2.0 : 2.2;
        return (values.area * values.plantingRate * seqRate) / 1000; // Convert to tCO2/year
      case 'soilCarbon':
        seqRate = values.managementType === 'organic' ? 3.0 : 2.0;
        return (values.area * seqRate) / 1000;
      case 'grassland':
        seqRate = values.grassType === 'native' ? 4.0 : values.grassType === 'perennial' ? 3.5 : 3.0;
        return (values.area * seqRate) / 1000;
      default:
        return 0;
    }
  };

  const handleDataUpdate = (type, newValues) => {
    const estimatedSeq = calculateCarbonSeq(type, newValues);
    setData(prev => ({
      ...prev,
      [type]: {
        ...newValues,
        estimatedCarbonSeq: estimatedSeq
      }
    }));
  };

  const steps = [
    {
      label: 'Afforestation',
      icon: FaTree,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-green-50 flex items-center justify-center">
              <FaTree className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Afforestation</h3>
              <p className="text-gray-600">Track tree planting and carbon sequestration</p>
            </div>
          </div>
          <CarbonSinksInput
            type="afforestation"
            data={data.afforestation}
            onUpdate={(values) => handleDataUpdate('afforestation', values)}
          />
        </motion.div>
      )
    },
    {
      label: 'Soil Carbon',
      icon: FaLeaf,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-orange-50 flex items-center justify-center">
              <FaLeaf className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Soil Carbon</h3>
              <p className="text-gray-600">Manage soil carbon sequestration</p>
            </div>
          </div>
          <CarbonSinksInput
            type="soilCarbon"
            data={data.soilCarbon}
            onUpdate={(values) => handleDataUpdate('soilCarbon', values)}
          />
        </motion.div>
      )
    },
    {
      label: 'Grassland',
      icon: FaMountain,
      content: (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="p-6 bg-white rounded-xl shadow-lg"
        >
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-12 h-12 rounded-lg bg-yellow-50 flex items-center justify-center">
              <FaMountain className="w-6 h-6 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Grassland</h3>
              <p className="text-gray-600">Monitor grassland restoration</p>
            </div>
          </div>
          <CarbonSinksInput
            type="grassland"
            data={data.grassland}
            onUpdate={(values) => handleDataUpdate('grassland', values)}
          />
        </motion.div>
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-green-500 bg-opacity-20 flex items-center justify-center">
                  <FaTree className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Afforestation</p>
                  <h4 className="text-xl font-semibold text-gray-900">{data.afforestation.estimatedCarbonSeq.toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-orange-500 bg-opacity-20 flex items-center justify-center">
                  <FaLeaf className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Soil Carbon</p>
                  <h4 className="text-xl font-semibold text-gray-900">{data.soilCarbon.estimatedCarbonSeq.toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-yellow-50 to-yellow-100 p-6 rounded-xl shadow-sm"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-lg bg-yellow-500 bg-opacity-20 flex items-center justify-center">
                  <FaMountain className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Grassland</p>
                  <h4 className="text-xl font-semibold text-gray-900">{data.grassland.estimatedCarbonSeq.toFixed(2)} tCO2/year</h4>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Stepper and Charts */}
          {!showCharts ? (
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel
                    StepIconComponent={() => (
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        index === activeStep ? 'bg-orange-500 text-white' :
                        index < activeStep ? 'bg-green-500 text-white' :
                        'bg-gray-200 text-gray-500'
                      }`}>
                        {React.createElement(step.icon, { className: 'w-4 h-4' })}
                      </div>
                    )}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {step.content}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          variant="outlined"
                          onClick={handleNext}
                          sx={{ 
                            mt: 1, 
                            mr: 1,
                            color: '#059669', 
                            borderColor: '#059669',
                            '&:hover': {
                              color: '#FFFFFF',
                              borderColor: '#059669',
                              backgroundColor: '#059669'
                            }
                          }}
                        >
                          {index === steps.length - 1 ? 'Finish' : 'Continue'}
                        </Button>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ 
                            mt: 1, 
                            mr: 1,
                            color: '#F59E0B',
                            border: 'none',
                            '&:hover': {
                              backgroundColor: 'rgba(245, 158, 11, 0.04)'
                            }
                          }}
                          variant="text"
                        >
                          Back
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">Carbon Sequestration Analysis</h3>
                <Button onClick={handleReset} variant="outlined">
                  Reset
                </Button>
              </div>
              <CarbonSinksVisualisation data={data} />
            </motion.div>
          )}
        </motion.div>
      </div>
    </ThemeProvider>
  );
};

export default CarbonSinks;
