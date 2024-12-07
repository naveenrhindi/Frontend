import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const ExcavationData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      excavation: {
        ...prev.excavation,
        [name]: value
      }
    }));
  };

  return (
    <Box className="space-y-4">
      <TextField
        fullWidth
        required
        label="Coal Amount (tonnes)"
        name="coalAmount"
        type="number"
        value={formData.excavation.coalAmount}
        onChange={handleChange}
        className="bg-white"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFA500',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFA500',
          },
        }}
      />

      <FormControl fullWidth required>
        <InputLabel id="method-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Excavation Method
        </InputLabel>
        <Select
          labelId="method-label"
          name="method"
          value={formData.excavation.method}
          label="Excavation Method"
          onChange={handleChange}
          sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
          }}
        >
          <MenuItem value="Surface Mining">Surface Mining</MenuItem>
          <MenuItem value="Underground Mining">Underground Mining</MenuItem>
          <MenuItem value="Strip Mining">Strip Mining</MenuItem>
          <MenuItem value="Mountain Top Removal">Mountain Top Removal</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="fuel-type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Fuel Type
        </InputLabel>
        <Select
          labelId="fuel-type-label"
          name="fuelType"
          value={formData.excavation.fuelType}
          label="Fuel Type"
          onChange={handleChange}
          sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
          }}
        >
          <MenuItem value="Diesel">Diesel</MenuItem>
          <MenuItem value="Petrol">Petrol</MenuItem>
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Natural Gas">Natural Gas</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        required
        label="Distance (km)"
        name="distance"
        type="number"
        value={formData.excavation.distance}
        onChange={handleChange}
        className="bg-white"
        sx={{
          '& .MuiOutlinedInput-root': {
            '&:hover fieldset': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused fieldset': {
              borderColor: '#FFA500',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#FFA500',
          },
        }}
      />

      <FormControl fullWidth required>
        <InputLabel id="equipment-used-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Equipment Used
        </InputLabel>
        <Select
          labelId="equipment-used-label"
          name="equipmentUsed"
          value={formData.excavation.equipmentUsed}
          label="Equipment Used"
          onChange={handleChange}
          sx={{
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: '#FFA500',
            },
          }}
        >
          <MenuItem value="Excavator">Excavator</MenuItem>
          <MenuItem value="Dragline">Dragline</MenuItem>
          <MenuItem value="Continuous Miner">Continuous Miner</MenuItem>
          <MenuItem value="Longwall Miner">Longwall Miner</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default ExcavationData;
