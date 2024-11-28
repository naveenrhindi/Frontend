import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { motion } from 'framer-motion';

const CarbonSinksVisualisation = ({ data }) => {
  // Calculate total areas and sequestration for each type
  const calculateMetrics = () => {
    const afforestationSeq = data.afforestation.area * data.afforestation.plantingRate * 0.05;
    const soilSeq = data.soilCarbon.area * (data.soilCarbon.managementType === 'organic' ? 3 : 2);
    const grasslandSeq = data.grassland.area * (data.grassland.grassType === 'native' ? 4 : 3);

    return {
      areas: [data.afforestation.area, data.soilCarbon.area, data.grassland.area],
      sequestration: [afforestationSeq, soilSeq, grasslandSeq]
    };
  };

  const metrics = calculateMetrics();

  const areaChartConfig = {
    series: [{
      name: 'Area (ha)',
      data: metrics.areas
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
          horizontal: false,
          columnWidth: '55%',
          borderRadius: 5,
          distributed: true
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent']
      },
      xaxis: {
        categories: ['Afforestation', 'Soil Carbon', 'Grassland'],
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          style: {
            colors: '#64748B'
          }
        }
      },
      yaxis: {
        title: {
          text: 'Area (hectares)',
          style: {
            color: '#64748B'
          }
        },
        labels: {
          style: {
            colors: '#64748B'
          }
        }
      },
      fill: {
        opacity: 1,
        colors: ['#22c55e', '#16a34a', '#15803d']
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + " ha";
          }
        }
      },
      grid: {
        show: true,
        borderColor: '#E2E8F0',
        strokeDashArray: 5,
        position: 'back'
      },
      theme: {
        mode: 'light'
      }
    }
  };

  const sequestrationChartConfig = {
    series: metrics.sequestration,
    options: {
      chart: {
        type: 'donut',
        height: 350
      },
      labels: ['Afforestation', 'Soil Carbon', 'Grassland'],
      colors: ['#22c55e', '#16a34a', '#15803d'],
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
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0).toFixed(2) + ' tCO2e';
                }
              }
            }
          }
        }
      },
      dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
          return opts.w.globals.series[opts.seriesIndex].toFixed(1) + ' tCO2e';
        }
      },
      legend: {
        show: true,
        position: 'bottom',
        labels: {
          colors: '#64748B'
        }
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val.toFixed(2) + ' tCO2e';
          }
        }
      },
      theme: {
        mode: 'light'
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="p-6 space-y-6"
    >
      <div>
        <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
          Area Distribution
        </h4>
        <div className="h-[350px]">
          <ReactApexChart
            options={areaChartConfig.options}
            series={areaChartConfig.series}
            type="bar"
            height={350}
          />
        </div>
      </div>

      <div>
        <h4 className="text-xl font-semibold text-black dark:text-white mb-4">
          Carbon Sequestration
        </h4>
        <div className="h-[350px]">
          <ReactApexChart
            options={sequestrationChartConfig.options}
            series={sequestrationChartConfig.series}
            type="donut"
            height={350}
          />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <h5 className="text-lg font-semibold text-black dark:text-white mb-2">Afforestation Impact</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Total Trees: {(data.afforestation.area * data.afforestation.plantingRate).toLocaleString()}
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Type: {data.afforestation.treeType}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <h5 className="text-lg font-semibold text-black dark:text-white mb-2">Soil Management</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Area: {data.soilCarbon.area.toLocaleString()} ha
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Practice: {data.soilCarbon.managementType}
          </p>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="rounded-sm border border-stroke bg-white p-4 shadow-default dark:border-strokedark dark:bg-boxdark"
        >
          <h5 className="text-lg font-semibold text-black dark:text-white mb-2">Grassland Status</h5>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Area: {data.grassland.area.toLocaleString()} ha
          </p>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Type: {data.grassland.grassType}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CarbonSinksVisualisation;
