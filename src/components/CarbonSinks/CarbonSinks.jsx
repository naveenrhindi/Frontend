import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  CircularProgress,
} from '@mui/material';
import { FaTree, FaLeaf, FaMountain } from 'react-icons/fa';
import CarbonSinksInput from './CarbonSinksInput';
import CarbonSinksVisualisation from './CarbonSinksVisualisation';
import { carbonSinkService } from '../../api/services/carbonSinkService';
import { toast } from 'react-toastify';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFA500',
      light: '#FFD9B3',
    },
    secondary: {
      main: '#32CD32',
    },
  },
});

const CarbonSinks = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showCharts, setShowCharts] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [data, setData] = useState({
    afforestation: {
      area: 0,
      treePlantingRate: 0,
      treeType: 'broadleaf',
      location: '',
      estimatedCarbonSeq: 0
    },
    biodiversityConservation: {
      area: 0,
      habitatType: 'wetland',
      speciesCount: 0,
      location: '',
      estimatedCarbonSeq: 0
    },
    greenTechnology: {
      technologyType: 'solar',
      capacity: 0,
      efficiency: 0,
      location: '',
      estimatedCarbonSeq: 0
    }
  });

  const validateData = () => {
    const types = ['afforestation', 'biodiversityConservation', 'greenTechnology'];
    for (const type of types) {
      const sinkData = data[type];
      if (!sinkData.location) {
        toast.error(`Please enter location for ${type}`);
        return false;
      }
      if (type === 'afforestation') {
        if (!sinkData.area || !sinkData.treePlantingRate) {
          toast.error('Please fill in all afforestation fields');
          return false;
        }
      } else if (type === 'biodiversityConservation') {
        if (!sinkData.area || !sinkData.speciesCount) {
          toast.error('Please fill in all biodiversity conservation fields');
          return false;
        }
      } else if (type === 'greenTechnology') {
        if (!sinkData.capacity || !sinkData.efficiency) {
          toast.error('Please fill in all green technology fields');
          return false;
        }
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateData()) return;
    
    setIsSubmitting(true);
    try {
      const submissions = await Promise.all([
        carbonSinkService.addCarbonSink({ type: 'afforestation', ...data.afforestation }),
        carbonSinkService.addCarbonSink({ type: 'biodiversityConservation', ...data.biodiversityConservation }),
        carbonSinkService.addCarbonSink({ type: 'greenTechnology', ...data.greenTechnology })
      ]);

      toast.success('Carbon sink data submitted successfully!');
      navigate('/progress');
    } catch (error) {
      toast.error(error.message || 'Failed to submit carbon sink data');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleReset = () => {
    setActiveStep(0);
    setShowCharts(false);
    setData({
      afforestation: { area: 0, treePlantingRate: 0, treeType: 'broadleaf', location: '', estimatedCarbonSeq: 0 },
      biodiversityConservation: { area: 0, habitatType: 'wetland', speciesCount: 0, location: '', estimatedCarbonSeq: 0 },
      greenTechnology: { technologyType: 'solar', capacity: 0, efficiency: 0, location: '', estimatedCarbonSeq: 0 }
    });
  };

  const calculateCarbonSeq = (type, values) => {
    let seqRate;
    switch(type) {
      case 'afforestation':
        seqRate = values.treeType === 'broadleaf' ? 2.5 : values.treeType === 'evergreen' ? 2.0 : 2.2;
        return (values.area * values.treePlantingRate * seqRate) / 1000;
      case 'biodiversityConservation':
        seqRate = values.habitatType === 'wetland' ? 4.0 : values.habitatType === 'forest' ? 3.5 : 3.0;
        return (values.area * seqRate) / 1000;
      case 'greenTechnology':
        return (values.capacity * values.efficiency) / 100;
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
      type: 'afforestation',
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
      label: 'Biodiversity Conservation',
      icon: FaLeaf,
      type: 'biodiversityConservation',
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
              <h3 className="text-xl font-semibold text-gray-900">Biodiversity Conservation</h3>
              <p className="text-gray-600">Manage biodiversity conservation efforts</p>
            </div>
          </div>
          <CarbonSinksInput
            type="biodiversityConservation"
            data={data.biodiversityConservation}
            onUpdate={(values) => handleDataUpdate('biodiversityConservation', values)}
          />
        </motion.div>
      )
    },
    {
      label: 'Green Technology',
      icon: FaMountain,
      type: 'greenTechnology',
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
              <h3 className="text-xl font-semibold text-gray-900">Green Technology</h3>
              <p className="text-gray-600">Monitor green technology adoption</p>
            </div>
          </div>
          <CarbonSinksInput
            type="greenTechnology"
            data={data.greenTechnology}
            onUpdate={(values) => handleDataUpdate('greenTechnology', values)}
          />
        </motion.div>
      )
    }
  ];

  return (
    <ThemeProvider theme={theme}>
      <div className="container mx-auto p-6">
        {/* Header Stats Section */}
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
                <p className="text-sm text-gray-600">Biodiversity Conservation</p>
                <h4 className="text-xl font-semibold text-gray-900">{data.biodiversityConservation.estimatedCarbonSeq.toFixed(2)} tCO2/year</h4>
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
                <p className="text-sm text-gray-600">Green Technology</p>
                <h4 className="text-xl font-semibold text-gray-900">{data.greenTechnology.estimatedCarbonSeq.toFixed(2)} tCO2/year</h4>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6"
        >
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
                    <CarbonSinksInput
                      type={step.type}
                      data={data[step.type]}
                      onUpdate={(newValues) => handleDataUpdate(step.type, newValues)}
                    />
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          onClick={handleNext}
                          variant="outlined"
                          disabled={isSubmitting}
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
                          {isSubmitting ? (
                            <CircularProgress size={24} color="inherit" />
                          ) : index === steps.length - 1 ? (
                            'Submit'
                          ) : (
                            'Continue'
                          )}
                        </Button>
                        <Button
                          disabled={index === 0 || isSubmitting}
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
