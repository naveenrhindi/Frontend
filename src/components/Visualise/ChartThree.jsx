import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';

const options = {
  chart: {
    fontFamily: 'Satoshi, sans-serif',
    type: 'donut',
    background: '#FFFFFF', // Background color for the chart
  },
  colors: ['#3C50E0', '#6577F3', '#8FD0EF', '#0FADCF'],
  labels: ['CO2', 'Methane', 'SO2', 'Particulate Matter'],
  legend: {
    show: false,
    position: 'bottom',
    labels: {
      colors: '#000000', // Black text color for legend labels
    },
  },
  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

const ChartThree = () => {
  const [state, setState] = useState({
    series: [45, 30, 15, 10], // Example data for emissions in percentage
  });

  const handleReset = () => {
    setState({
      series: [45, 30, 15, 10],
    });
  };

  return (
    <div className="col-span-12 rounded-lg border border-black bg-white px-5 pb-5 pt-7.5 shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105 hover:shadow-2xl xl:col-span-5">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black mb-3 mt-6 ml-4">
            Emissions Analytics - Coal Mine Process
          </h5>
        </div>
        <div>
          <div className="relative z-20 inline-block">
            <select
              className="relative text-black mt-6 z-20 inline-flex appearance-none bg-transparent py-1 pl-3 pr-8 text-sm font-medium outline-none"
            >
              <option value="" className="text-gray-950 bg-white">Monthly</option>
            </select>
            <span className="absolute right-3 top-1/2 z-10 -translate-y-1/2">
              <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                <path
                  d="M0.47 1.09c0-.06.03-.13.08-.17a.44.44 0 0 1 .37 0l3.94 3.71a.42.42 0 0 0 .29.11.42.42 0 0 0 .3-.12L9.09.9a.44.44 0 0 1 .63.63L5.5 4.99a1.05 1.05 0 0 1-1.5 0L.47 1.1Z"
                  fill="#637381"
                />
              </svg>
            </span>
          </div>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={state.series}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 mb-4 flex flex-wrap items-center justify-center gap-y-3">
        {options.labels.map((label, index) => (
          <div key={index} className="sm:w-1/2 w-full px-8">
            <div className="flex w-full items-center">
              <span
                className={`mr-2 block h-3 w-full max-w-3 rounded-full`}
                style={{ backgroundColor: options.colors[index] }}
              ></span>
              <p className="flex w-full justify-between text-sm font-medium text-black">
                <span>{label}</span>
                <span>{state.series[index]}%</span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChartThree;
