import React from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = ({ title, dateRange, data }) => {
  const options = {
    legend: { show: false, position: 'top', horizontalAlign: 'left' },
    colors: ['#3C50E0', '#80CAEE'],
    chart: {
      height: '100%',
      type: 'area',
      dropShadow: {
        enabled: true,
        color: '#623CEA14',
        top: 10,
        blur: 4,
        opacity: 0.1,
      },
      toolbar: { show: false },
    },
    responsive: [
      { breakpoint: 1024, options: { chart: { height: '100%' } } },
      { breakpoint: 1366, options: { chart: { height: '100%' } } },
    ],
    stroke: { width: [2, 2], curve: 'straight' },
    grid: {
      borderColor: '#374151', // Gray-700 color for grid lines
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#3056D3', '#80CAEE'],
      strokeWidth: 3,
    },
    xaxis: {
      type: 'category',
      categories: [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
      ],
      labels: {
        style: {
          colors: '#FFFFFF', // White text color for x-axis labels
        },
      },
    },
    yaxis: {
      min: 0, max: 100,
      labels: {
        style: {
          colors: '#FFFFFF', // White text color for y-axis labels
        },
      },
    },
  };

  return (
    <div className="col-span-12 rounded-sm border-stroke bg-gray-800 p-6 shadow-default dark:border-strokedark dark:bg-boxdark w-full">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-white dark:text-white">
            {title}
          </h4>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <div className="chart-date-range text-lg font-semibold text-white dark:text-white mt-2">
              {dateRange}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 ml-6 rounded-full bg-[#3C50E0]"></span>
          <span className="text-sm text-white dark:text-white">Coal Production</span>
        </div>
        <div className="flex items-center space-x-2">
          <span className="w-3 h-3 rounded-full bg-[#80CAEE]"></span>
          <span className="text-sm text-white dark:text-white">Fuel Consumption</span>
        </div>
      </div>

      <div>
        <div id="chartOne" className="w-full h-96">
          <ReactApexChart options={options} series={data} type="area" height="100%" />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
