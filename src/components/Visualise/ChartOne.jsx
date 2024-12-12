import React, { useState, useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';

const ChartOne = () => {
  const [viewType, setViewType] = useState('yearly');
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(0); // January
  const [categories, setCategories] = useState(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
  const [currentData, setCurrentData] = useState([
    {
      name: 'Coal Production',
      data: [28, 48, 40, 19, 86, 27, 30, 50, 60, 40, 70, 90],
    },
    {
      name: 'Fuel Consumption',
      data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 50, 65, 80],
    },
  ]);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const years = Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i);

  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  useEffect(() => {
    if (viewType === 'monthly') {
      const daysInMonth = getDaysInMonth(selectedMonth, selectedYear);
      setCategories(Array.from({ length: daysInMonth }, (_, i) => (i + 1).toString()));
      
      // Generate daily data for the selected month
      const dailyData = [
        {
          name: 'Coal Production',
          data: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 100)),
        },
        {
          name: 'Fuel Consumption',
          data: Array.from({ length: daysInMonth }, () => Math.floor(Math.random() * 100)),
        },
      ];
      setCurrentData(dailyData);
    } else {
      setCategories(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']);
      setCurrentData([
        {
          name: 'Coal Production',
          data: [28, 48, 40, 19, 86, 27, 30, 50, 60, 40, 70, 90],
        },
        {
          name: 'Fuel Consumption',
          data: [65, 59, 80, 81, 56, 55, 40, 60, 70, 50, 65, 80],
        },
      ]);
    }
  }, [viewType, selectedMonth, selectedYear]);

  const options = {
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    colors: ['#006400', '#90EE90'],
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
    stroke: { width: [2, 2], curve: 'straight', colors: ['#006400', '#32CD32'] },
    grid: {
      borderColor: '#d1d5db',
      xaxis: { lines: { show: true } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    markers: {
      size: 4,
      colors: '#fff',
      strokeColors: ['#006400', '#32CD32'],
      strokeWidth: [2, 3],
    },
    xaxis: {
      type: 'category',
      categories: categories,
      title: {
        text: viewType === 'monthly' ? 'Days' : 'Months',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
      labels: {
        style: {
          colors: '#000000',
        },
      },
    },
    yaxis: {
      min: 0,
      max: 100,
      title: {
        text: 'Values',
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
        },
      },
      labels: {
        style: {
          colors: '#000000',
        },
      },
    },
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      y: {
        formatter: function (value) {
          return value.toFixed(2);
        }
      }
    }
  };

  return (
    <div className="col-span-12 rounded-sm bg-white p-6">
      <div className="mb-4 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-xl font-semibold text-black">
            Coal Production vs Fuel Consumption
          </h4>
        </div>
        <div className="flex gap-2">
          <select
            value={viewType}
            onChange={(e) => setViewType(e.target.value)}
            className="text-sm rounded-md border-[1.5px] border-stroke bg-transparent py-1 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            <option value="yearly">Yearly</option>
            <option value="monthly">Monthly</option>
          </select>
          
          {viewType === 'monthly' && (
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
              className="text-sm rounded-md border-[1.5px] border-stroke bg-transparent py-1 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            >
              {months.map((month, index) => (
                <option key={month} value={index}>
                  {month}
                </option>
              ))}
            </select>
          )}
          
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="text-sm rounded-md border-[1.5px] border-stroke bg-transparent py-1 px-3 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <div id="chartOne" className="-ml-5 h-[355px] w-[105%]">
          <ReactApexChart
            options={options}
            series={currentData}
            type="area"
            height={350}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
