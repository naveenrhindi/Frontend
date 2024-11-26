import React, { useState } from 'react';
import ChartOne from './ChartOne';
import ChartTwo from './ChartTwo';
import ChartThree from './ChartThree';
import CardDataStats from './CardDataStats';

// Paths to your own icon images
import coalIcon from '../../assets/icons/coalicon1.png';
import gasPumpIcon from '../../assets/icons/fuel.png';
import carbonOffsetIcon from '../../assets/icons/carbonoffset.png';
import emissionIcon from '../../assets/icons/emissionicon.png';

const Visualization = () => {
  const [dateRange, setDateRange] = useState('January - December');

  const handleDateRangeChange = (value) => {
    setDateRange(value);
  };

  // Sample data for ChartOne and CustomBarChart
  const chartOneData = [
    {
      name: 'Fuel Consumption',
      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 50, 65, 80],
    },
    {
      name: 'Coal Production',
      data: [28, 48, 40, 19, 86, 27, 30, 50, 60, 40, 70, 90],
    },
  ];

  const customBarChartData = [
    {
      name: 'Coal Production',
      data: [28, 48, 40, 19, 86, 27, 30, 50, 60, 40, 70, 90],
    },
    {
      name: 'Fuel Consumption',
      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 50, 65, 80],
    },
  ];

  const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dateRangeOptions = ['January - December', 'January - June', 'July - December'];

  return (
    <div className="p-6 rounded-lg shadow-md mt-8 ml-8">
      <h2 className="text-2xl font-bold mb-4 text-black">Data Visualization</h2>

      {/* Cards Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        <CardDataStats
          title="Coal Production"
          total="1,200 Tons/Day"
          rate="+5%"
          levelUp
          icon={coalIcon}
        />
        <CardDataStats
          title="Fuel Consumption"
          total="800 Tons/Day"
          rate="+2%"
          levelUp
          icon={gasPumpIcon}
        />
        <CardDataStats
          title="Carbon Offset"
          total="500 Tons/Day"
          rate="-4%"
          levelDown
          icon={carbonOffsetIcon}
        />
        <CardDataStats
          title="Emission Level"
          total="900 Tons/Day"
          rate="+3%"
          levelUp
          icon={emissionIcon}
        />
      </div>

      {/* ChartOne */}
      <div className="mb-8 border border-black p-6 rounded-lg shadow-md mt-8 ml-0">
        <ChartOne title="Coal Production and Fuel Consumption" dateRange="January - December" data={chartOneData} />
      </div>

      {/* Grid container for ChartTwo and ChartThree */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="col-span-2">
          <ChartTwo />
        </div>
        <div className="col-span-1">
          <ChartThree />
        </div>
      </div>
    </div>
  );
};

export default Visualization;
