import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import axios from 'axios';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';

const Dashboard = ({ newEmissionData }) => {
  const [chartData, setChartData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [openBackdateDialog, setOpenBackdateDialog] = useState(false);
  const [backdateEmission, setBackdateEmission] = useState({
    date: new Date(),
    excavation: '',
    transportation: '',
    equipmentUsage: '',
    methaneEntrapment: ''
  });

  // Generate array of years (last 5 years)
  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);
  
  // Array of months
  const months = [
    { value: 1, label: 'January' },
    { value: 2, label: 'February' },
    { value: 3, label: 'March' },
    { value: 4, label: 'April' },
    { value: 5, label: 'May' },
    { value: 6, label: 'June' },
    { value: 7, label: 'July' },
    { value: 8, label: 'August' },
    { value: 9, label: 'September' },
    { value: 10, label: 'October' },
    { value: 11, label: 'November' },
    { value: 12, label: 'December' }
  ];

  const fetchUserEmissions = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await axios.get(
        `http://localhost:5001/api/emissions/user-emissions`,
        {
          params: {
            year: selectedYear,
            month: selectedMonth
          },
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`
          }
        }
      );

      let transformedData = response.data.map(entry => ({
        date: new Date(entry.emissionDate).toISOString().split('T')[0],
        excavation: parseFloat(entry.excavation.coalAmount) || 0,
        transportation: parseFloat(entry.transportation.coalTransported) || 0,
        equipmentUsage: parseFloat(entry.equipmentUsage.operatingHours) || 0,
        methaneEntrapment: parseFloat(entry.methaneEntrapment.captureRate) || 0,
      }));

      // If no data available for this month, show estimated/sample data
      if (transformedData.length === 0) {
        // Generate sample data points for the selected month
        const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
        transformedData = Array.from({ length: 3 }, (_, i) => {
          const day = Math.floor((i + 1) * daysInMonth / 4); // Spread out over the month
          return {
            date: `${selectedYear}-${String(selectedMonth).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
            excavation: Math.floor(Math.random() * 100 + 50), // Random values between 50-150
            transportation: Math.floor(Math.random() * 100 + 50),
            equipmentUsage: Math.floor(Math.random() * 100 + 50),
            methaneEntrapment: Math.floor(Math.random() * 100 + 50),
            isEstimated: true // Flag to identify estimated data
          };
        });
      }

      setChartData(transformedData);
    } catch (err) {
      console.error('Error fetching emissions data:', err);
      setError(err.message || 'Error fetching emissions data');
    } finally {
      setLoading(false);
    }
  };

  const handleBackdateSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      await axios.post(
        `http://localhost:5001/api/emissions/backdate-emission`,
        backdateEmission,
        {
          headers: {
            'Authorization': token.startsWith('Bearer ') ? token : `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      setOpenBackdateDialog(false);
      fetchUserEmissions(); // Refresh the data
    } catch (err) {
      console.error('Error backdating emission:', err);
      setError(err.message || 'Error backdating emission');
    }
  };

  // Fetch data when year or month changes
  useEffect(() => {
    fetchUserEmissions();
  }, [selectedYear, selectedMonth]);

  // Add new emission data when it comes in
  useEffect(() => {
    if (newEmissionData) {
      const emissionDate = new Date(newEmissionData.emissionDate);
      if (emissionDate.getFullYear() === selectedYear && 
          emissionDate.getMonth() + 1 === selectedMonth) {
        setChartData(prevData => [...prevData.filter(d => !d.isEstimated), {
          date: emissionDate.toISOString().split('T')[0],
          excavation: parseFloat(newEmissionData.excavation.coalAmount) || 0,
          transportation: parseFloat(newEmissionData.transportation.coalTransported) || 0,
          equipmentUsage: parseFloat(newEmissionData.equipmentUsage.operatingHours) || 0,
          methaneEntrapment: parseFloat(newEmissionData.methaneEntrapment.captureRate) || 0,
        }]);
      }
    }
  }, [newEmissionData]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <Paper sx={{ p: 2 }}>
          <Typography variant="body2">Date: {label}</Typography>
          {payload.map((entry, index) => (
            <Typography 
              key={index} 
              variant="body2" 
              sx={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
              {entry.payload.isEstimated && ' (Estimated)'}
            </Typography>
          ))}
        </Paper>
      );
    }
    return null;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Emission Data Dashboard
        </Typography>
        
        {/* Time period filters and Add Historical Data button */}
        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Year</InputLabel>
              <Select
                value={selectedYear}
                label="Year"
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                {years.map(year => (
                  <MenuItem key={year} value={year}>{year}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Month</InputLabel>
              <Select
                value={selectedMonth}
                label="Month"
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map(month => (
                  <MenuItem key={month.value} value={month.value}>
                    {month.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button 
              variant="contained" 
              onClick={() => setOpenBackdateDialog(true)}
              sx={{ 
                height: '100%',
                backgroundColor: '#FFA500',
                '&:hover': {
                  backgroundColor: '#FF8C00'
                }
              }}
            >
              Add Historical Data
            </Button>
          </Grid>
        </Grid>

        {/* Error message */}
        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {/* Loading message */}
        {loading && (
          <Typography sx={{ mb: 2 }}>
            Loading emissions data...
          </Typography>
        )}

        {/* No data message */}
        {!loading && chartData.length === 0 && (
          <Paper sx={{ p: 3, mb: 3, textAlign: 'center', backgroundColor: '#f5f5f5' }}>
            <Typography variant="h6" color="textSecondary">
              No emissions data available for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
            </Typography>
            <Typography variant="body1" color="textSecondary" sx={{ mt: 1 }}>
              You can add historical data using the button above
            </Typography>
          </Paper>
        )}

        {/* Chart */}
        {chartData.length > 0 && (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Emission Trends for {months.find(m => m.value === selectedMonth)?.label} {selectedYear}
                </Typography>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend />
                    <Line 
                      type="monotone" 
                      dataKey="excavation" 
                      stroke="#8884d8" 
                      name="Excavation"
                      strokeDasharray={chartData.some(d => d.isEstimated) ? "5 5" : "0"}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="transportation" 
                      stroke="#82ca9d" 
                      name="Transportation"
                      strokeDasharray={chartData.some(d => d.isEstimated) ? "5 5" : "0"}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="equipmentUsage" 
                      stroke="#ffc658" 
                      name="Equipment Usage"
                      strokeDasharray={chartData.some(d => d.isEstimated) ? "5 5" : "0"}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="methaneEntrapment" 
                      stroke="#ff7300" 
                      name="Methane Entrapment"
                      strokeDasharray={chartData.some(d => d.isEstimated) ? "5 5" : "0"}
                    />
                  </LineChart>
                </ResponsiveContainer>
                {chartData.some(d => d.isEstimated) && (
                  <Typography variant="caption" color="textSecondary" sx={{ mt: 2, display: 'block' }}>
                    Note: Dashed lines indicate estimated data
                  </Typography>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Paper>

      {/* Backdate Dialog */}
      <Dialog open={openBackdateDialog} onClose={() => setOpenBackdateDialog(false)}>
        <DialogTitle>Add Historical Emission Data</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label="Date"
                value={backdateEmission.date}
                onChange={(newDate) => setBackdateEmission(prev => ({ ...prev, date: newDate }))}
                renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 2 }} />}
              />
            </LocalizationProvider>
            <TextField
              label="Excavation Amount"
              type="number"
              fullWidth
              value={backdateEmission.excavation}
              onChange={(e) => setBackdateEmission(prev => ({ ...prev, excavation: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Transportation Amount"
              type="number"
              fullWidth
              value={backdateEmission.transportation}
              onChange={(e) => setBackdateEmission(prev => ({ ...prev, transportation: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Equipment Usage"
              type="number"
              fullWidth
              value={backdateEmission.equipmentUsage}
              onChange={(e) => setBackdateEmission(prev => ({ ...prev, equipmentUsage: e.target.value }))}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Methane Entrapment"
              type="number"
              fullWidth
              value={backdateEmission.methaneEntrapment}
              onChange={(e) => setBackdateEmission(prev => ({ ...prev, methaneEntrapment: e.target.value }))}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenBackdateDialog(false)}>Cancel</Button>
          <Button onClick={handleBackdateSubmit} variant="contained" sx={{ backgroundColor: '#FFA500' }}>
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard;
