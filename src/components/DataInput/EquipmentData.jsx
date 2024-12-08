import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const EquipmentData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      equipmentUsage: {
        ...prev.equipmentUsage,
        [name]: value
      }
    }));
  };

  return (
    <Box className="space-y-4">
      <FormControl fullWidth required>
        <InputLabel id="type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Equipment Type
        </InputLabel>
        <Select
          labelId="type-label"
          name="type"
          value={formData.equipmentUsage.type}
          label="Equipment Type"
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
          <MenuItem value="Loader">Loader</MenuItem>
          <MenuItem value="Drill">Drill</MenuItem>
          <MenuItem value="Crusher" disabled>Crusher (View Only)</MenuItem>
          <MenuItem value="Conveyor" disabled>Conveyor (View Only)</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="fuel-type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Fuel Type
        </InputLabel>
        <Select
          labelId="fuel-type-label"
          name="fuelType"
          value={formData.equipmentUsage.fuelType}
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
          <MenuItem value="Electric">Electric</MenuItem>
          <MenuItem value="Hybrid">Hybrid</MenuItem>
          <MenuItem value="Natural Gas" disabled>Natural Gas (View Only)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        required
        label="Operating Hours"
        name="operatingHours"
        type="number"
        value={formData.equipmentUsage.operatingHours}
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

      <TextField
        fullWidth
        required
        label="Fuel Consumption per Hour (L/hr)"
        name="fuelConsumptionPerHour"
        type="number"
        value={formData.equipmentUsage.fuelConsumptionPerHour}
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
    </Box>
  );
};

export default EquipmentData;
