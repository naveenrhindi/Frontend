import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';
import { FaTree, FaSeedling, FaLeaf } from 'react-icons/fa';
import { BsArrowUpShort, BsArrowDownShort } from 'react-icons/bs';

const StatsCard = ({
  icon: Icon,
  value,
  label,
  change,
  isPositive,
  isNegative
}) => {
  return (
    <div className="relative flex flex-col p-6 bg-white rounded-[20px] border border-gray-100">
      <div className="w-12 h-12 mb-4 flex items-center justify-center">
        <Icon className={`text-2xl ${
          isPositive ? 'text-green-500' : 
          isNegative ? 'text-blue-500' : 
          'text-orange-500'
        }`} />
      </div>
      
      <div className="flex flex-col gap-1">
        <h3 className="text-2xl font-bold text-gray-900">
          {value}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gray-500 text-sm">
            {label}
          </span>
          <span className={`flex items-center text-sm font-medium ${
            isPositive ? 'text-green-500' : 
            isNegative ? 'text-blue-500' : 
            'text-orange-500'
          }`}>
            {change}
            {isPositive && <BsArrowUpShort className="text-xl" />}
            {isNegative && <BsArrowDownShort className="text-xl" />}
          </span>
        </div>
      </div> 
    </div>
  );
};

const CarbonSinksVisualisation = ({ data }) => {
  // Bar Chart - Areas by Type
  const areaChartConfig = {
    series: [{
      name: 'Area',
      data: [
        data.afforestation.area,
        data.soilCarbon.area,
        data.grassland.area
      ]
    }],
    options: {
      chart: {
        type: 'bar',
        height: 350,
        toolbar: {
          show: false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          dataLabels: {
            position: 'top'
          },
          columnWidth: '50%',
        }
      },
      colors: ['#10B981'],
      dataLabels: {
        enabled: true,
        formatter: function (val) {
          return val.toFixed(1) + " ha";
        },
        offsetY: -20,
        style: {
          fontSize: '12px',
          colors: ["#304758"]
        }
      },
      xaxis: {
        categories: ["Afforestation", "Soil Carbon", "Grassland"],
        position: 'bottom',
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: '#304758',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val.toFixed(1) + " ha";
          },
          style: {
            colors: '#304758',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#e5e7eb',
        yaxis: {
          lines: {
            show: false
          }
        }
      }
    }
  };

  // Donut Chart - Carbon Sequestration by Type
  const sequestrationChartConfig = {
    series: [
      data.afforestation.estimatedCarbonSeq,
      data.soilCarbon.estimatedCarbonSeq,
      data.grassland.estimatedCarbonSeq
    ],
    options: {
      chart: {
        type: 'donut',
        height: 350
      },
      labels: ['Afforestation', 'Soil Carbon', 'Grassland'],
      colors: ['#10B981', '#F59E0B', '#3B82F6'],
      plotOptions: {
        pie: {
          donut: {
            size: '70%',
            labels: {
              show: true,
              total: {
                show: true,
                label: 'Total Sequestration',
                formatter: function (w) {
                  const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                  return total.toFixed(2) + ' tCO2/year';
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.config.series[opts.seriesIndex].toFixed(2) + ' tCO2/year';
        }
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          colors: '#304758'
        }
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 300
          },
          legend: {
            position: 'bottom'
          }
        }
      }]
    }
  };

  // Line Chart - Trend Analysis
  const trendChartConfig = {
    series: [{
      name: 'Projected Sequestration',
      data: [
        data.afforestation.estimatedCarbonSeq,
        data.afforestation.estimatedCarbonSeq * 1.2,
        data.afforestation.estimatedCarbonSeq * 1.5,
        data.afforestation.estimatedCarbonSeq * 1.8,
        data.afforestation.estimatedCarbonSeq * 2.1
      ]
    }],
    options: {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      colors: ['#10B981'],
      markers: {
        size: 4,
        colors: ['#10B981'],
        strokeColors: '#fff',
        strokeWidth: 2,
        hover: {
          size: 7,
        }
      },
      xaxis: {
        categories: ['Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5'],
        labels: {
          style: {
            colors: '#304758',
            fontSize: '12px'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Carbon Sequestration (tCO2/year)',
          style: {
            color: '#304758'
          }
        },
        labels: {
          formatter: function (val) {
            return val.toFixed(1);
          },
          style: {
            colors: '#304758',
            fontSize: '12px'
          }
        }
      },
      grid: {
        borderColor: '#e5e7eb'
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(2) + ' tCO2/year';
          }
        }
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={FaTree}
          value={`${data.afforestation.area} ha/day`}
          label="Total Afforestation"
          change="+2.5%"
          isPositive={true}
        />
        <StatsCard
          icon={FaSeedling}
          value={`${data.soilCarbon.area} ha/day`}
          label="Soil Carbon Area"
          change="+1.8%"
          isPositive={true}
        />
        <StatsCard
          icon={FaLeaf}
          value={`${data.grassland.area} ha/day`}
          label="Grassland Area"
          change="+3.2%"
          isPositive={true}
        />
        <StatsCard
          icon={FaTree}
          value={`${(data.afforestation.estimatedCarbonSeq + data.soilCarbon.estimatedCarbonSeq + data.grassland.estimatedCarbonSeq).toFixed(2)} tCO2/day`}
          label="Total Sequestration"
          change="+2.59%"
          isPositive={true}
        />
      </div>

      {/* Top row with area chart (3/4) and sequestration chart (1/4) */}
      <div className="mt-8 grid grid-cols-12 gap-6">
        {/* Area Distribution (3/4 width) */}
        <div className="col-span-9 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Area Distribution by Type</h3>
          <ReactApexChart
            options={areaChartConfig.options}
            series={areaChartConfig.series}
            type="bar"
            height={350}
          />
        </div>

        {/* Carbon Sequestration Distribution (1/4 width) */}
        <div className="col-span-3 bg-white p-6 rounded-[20px] border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Carbon Sequestration</h3>
          <ReactApexChart
            options={sequestrationChartConfig.options}
            series={sequestrationChartConfig.series}
            type="donut"
            height={350}
          />
        </div>
      </div>

      {/* Bottom row with trend chart (full width) */}
      <div className="w-full bg-white p-6 rounded-[20px] border border-gray-100">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">5-Year Sequestration Projection</h3>
        <ReactApexChart
          options={trendChartConfig.options}
          series={trendChartConfig.series}
          type="line"
          height={350}
        />
      </div>
    </motion.div>
  );
};

export default CarbonSinksVisualisation;
