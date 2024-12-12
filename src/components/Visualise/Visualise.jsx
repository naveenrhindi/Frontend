import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import ChartThree from './ChartThree';
import CardDataStats from './CardDataStats';
import { getEmissions, calculateEmissions } from '../../services/emissionService';

// Paths to your own icon images
import coalIcon from '../../assets/icons/coalicon1.png';
import gasPumpIcon from '../../assets/icons/fuel.png';
import carbonOffsetIcon from '../../assets/icons/carbonoffset.png';
import emissionIcon from '../../assets/icons/emissionicon.png';

const initialFixedData = [
  {
    name: 'Coal Production',
    data: Array(12).fill(0)
  },
  {
    name: 'Fuel Consumption',
    data: Array(12).fill(0)
  },
  {
    name: 'Monthly Emissions',
    data: Array(12).fill(0)
  }
];

const Visualization = () => {
  const location = useLocation();
  const [dateRange, setDateRange] = useState('January - December');
  const [cardData, setCardData] = useState({
    coalProduction: 0,
    fuelConsumption: 0,
    carbonOffset: 0,
    totalEmissions: 0
  });
  const [chartData, setChartData] = useState(initialFixedData);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [emissionsData, calculationsData] = await Promise.all([
          getEmissions(),
          calculateEmissions()
        ]);

        // Process data for cards
        const totalEmissions = calculationsData.totalEmissions || 0;
        const coalUsage = calculationsData.excavationEmissions?.coal || 0;
        const fuelUsage = calculationsData.transportationEmissions?.diesel || 0;
        const carbonOffset = calculationsData.methaneEmissions?.capturedMethane || 0;

        // Update card data with appropriate units
        setCardData({
          coalProduction: coalUsage,
          fuelConsumption: fuelUsage,
          carbonOffset: carbonOffset,
          totalEmissions: totalEmissions
        });

        // Process monthly data for charts
        const monthlyData = processMonthlyData(emissionsData);
        const pieChartData = processPieChartData(calculationsData);
        
        setChartData({
          coalData: monthlyData.coalData,
          fuelData: monthlyData.fuelData,
          emissionsData: monthlyData.emissionsData,
          pieData: pieChartData
        });

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [location]);

  useEffect(() => {
    if (location.state && location.state.newEmissionData) {
      const newData = location.state.newEmissionData;
      // Process and add new data to chartData
      setChartData(prevData => {
        const coalData = [...prevData.coalData, newData.coal];
        const fuelData = [...prevData.fuelData, newData.fuel];
        const emissionsData = [...prevData.emissionsData, newData.emissions];
        return { coalData, fuelData, emissionsData, pieData: prevData.pieData };
      });
    }
  }, [location.state]);

  const processMonthlyData = (emissions) => {
    const coalData = Array(12).fill(0);
    const fuelData = Array(12).fill(0);
    const emissionsData = Array(12).fill(0);

    emissions.forEach(emission => {
      const date = new Date(emission.createdAt);
      const month = date.getMonth();

      // Accumulate monthly data
      coalData[month] += emission.excavation?.coalAmount || 0;
      fuelData[month] += emission.transportation?.fuelConsumption || 0;
      emissionsData[month] += emission.totalEmissions || 0;
    });

    return { coalData, fuelData, emissionsData };
  };

  const processPieChartData = (calculations) => {
    return [
      calculations.excavationEmissions?.total || 0,
      calculations.transportationEmissions?.total || 0,
      calculations.equipmentEmissions?.total || 0,
      calculations.methaneEmissions?.total || 0
    ];
  };

  return (
    <div className="p-6 rounded-lg shadow-md mt-8 ml-8">
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-4 text-black">Data Visualization</h2>

          {/* Cards Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <CardDataStats
              title="Coal Production"
              total={`${(Number(cardData.coalProduction) / 1000).toFixed(2)} t CO₂e`}
              rate="+2.5%"
              levelUp
              icon={coalIcon}
            />
            <CardDataStats
              title="Fuel Consumption"
              total={`${Number(cardData.fuelConsumption).toFixed(2)} L/day`}
              rate="+3.2%"
              levelUp
              icon={gasPumpIcon}
            />
            <CardDataStats
              title="Carbon Offset"
              total={`${Number(cardData.carbonOffset).toFixed(2)} m³/day`}
              rate="+1.8%"
              levelUp
              icon={carbonOffsetIcon}
            />
            <CardDataStats
              title="Total Emissions"
              total={`${(Number(cardData.totalEmissions) / 1000).toFixed(2)} t CO₂e/year`}
              rate="-2.0%"
              levelDown
              icon={emissionIcon}
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <ChartOne 
              data={[
                {
                  name: 'Coal Production',
                  data: chartData.coalData
                },
                {
                  name: 'Fuel Consumption',
                  data: chartData.fuelData
                }
              ]}
            />
            <ChartTwo 
              data={[
                {
                  name: 'Monthly Emissions',
                  data: chartData.emissionsData
                }
              ]}
            />
            <ChartThree 
              data={chartData.pieData}
              labels={['Excavation', 'Transportation', 'Equipment', 'Methane']}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Visualization;
