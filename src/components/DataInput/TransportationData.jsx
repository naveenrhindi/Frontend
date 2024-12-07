import React from 'react';
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
} from '@mui/material';

const TransportationData = ({ formData, setFormData }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      transportation: {
        ...prev.transportation,
        [name]: value
      }
    }));
  };

  return (
    <Box className="space-y-4">
      <TextField
        fullWidth
        required
        label="Coal Transported (tonnes)"
        name="coalTransported"
        type="number"
        value={formData.transportation.coalTransported}
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
        <InputLabel id="mode-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Transportation Mode
        </InputLabel>
        <Select
          labelId="mode-label"
          name="mode"
          value={formData.transportation.mode}
          label="Transportation Mode"
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
          <MenuItem value="Truck">Truck</MenuItem>
          <MenuItem value="Rail">Rail</MenuItem>
          <MenuItem value="Conveyor">Conveyor</MenuItem>
          <MenuItem value="Ship">Ship</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth required>
        <InputLabel id="fuel-type-label" sx={{ '&.Mui-focused': { color: '#FFA500' } }}>
          Fuel Type
        </InputLabel>
        <Select
          labelId="fuel-type-label"
          name="fuelType"
          value={formData.transportation.fuelType}
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
          <MenuItem value="Natural Gas">Natural Gas</MenuItem>
        </Select>
      </FormControl>

      <TextField
        fullWidth
        required
        label="Distance per Trip (km)"
        name="distancePerTrip"
        type="number"
        value={formData.transportation.distancePerTrip}
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
        label="Vehicle Capacity (tonnes)"
        name="vehicleCapacity"
        type="number"
        value={formData.transportation.vehicleCapacity}
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
        label="Trips per Day"
        name="tripsPerDay"
        type="number"
        value={formData.transportation.tripsPerDay}
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

export default TransportationData;
