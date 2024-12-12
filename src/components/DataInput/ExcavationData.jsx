import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Checkbox,
  ListItemText,
} from '@mui/material';

const ExcavationData = ({ formData, setFormData }) => {
  const equipmentList = [
    { id: 'dragline', label: 'Dragline', available: true },
    { id: 'shovel', label: 'Power Shovel', available: true },
    { id: 'excavator', label: 'Hydraulic Excavator', available: true },
    { id: 'drill', label: 'Drill Machine', available: false },
    { id: 'crusher', label: 'Rock Crusher', available: false },
  ];

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

      <FormControl fullWidth >
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
          <MenuItem value="Strip Mining" disabled>Strip Mining (View Only)</MenuItem>
          <MenuItem value="Mountain Top Removal" disabled>Mountain Top Removal (View Only)</MenuItem>
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
          <MenuItem value="Natural Gas" disabled>Natural Gas (View Only)</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
       
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

      <FormControl fullWidth>
        <InputLabel id="equipment-used-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Equipment Used
        </InputLabel>
        <Select
          labelId="equipment-used-label"
          name="equipmentType"
          value={formData.excavation?.equipmentType || ''}
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

      <TextField
        fullWidth
        required
        label="Operating Hours"
        name="operatingHours"
        type="number"
        value={formData.excavation.operatingHours}
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
        value={formData.excavation.fuelConsumptionPerHour}
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

export default ExcavationData;