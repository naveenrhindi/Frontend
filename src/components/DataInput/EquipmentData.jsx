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
  const equipmentList = [
    { id: 'excavator', label: 'Excavator', available: true },
    { id: 'loader', label: 'Loader', available: true },
    { id: 'drill', label: 'Drill', available: true },
    { id: 'crusher', label: 'Crusher', available: false },
    { id: 'conveyor', label: 'Conveyor', available: false },
  ];

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
      <FormControl fullWidth>
        <InputLabel id="equipment-type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Equipment Type
        </InputLabel>
        <Select
          labelId="equipment-type-label"
          name="type"
          value={formData.equipmentUsage?.type || ''}
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
          {equipmentList.map((equipment) => (
            <MenuItem key={equipment.id} value={equipment.id} disabled={!equipment.available}>
              {equipment.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="fuel-type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Fuel Type
        </InputLabel>
        <Select
          labelId="fuel-type-label"
          name="fuelType"
          value={formData.equipmentUsage?.fuelType || ''}
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
          <MenuItem value="Natural Gas" disabled>Natural Gas (View Only)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        label="Operating Hours"
        name="operatingHours"
        type="number"
        value={formData.equipmentUsage?.operatingHours || ''}
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
        label="Fuel Consumption per Hour (L/hr)"
        name="fuelConsumptionPerHour"
        type="number"
        value={formData.equipmentUsage?.fuelConsumptionPerHour || ''}
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