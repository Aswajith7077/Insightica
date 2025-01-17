import React from 'react'
import ReactApexChart from 'react-apexcharts';

import { useState } from 'react';

const   BarChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "User Activites",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2]
      }
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar:{
          show:false
        }
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          dataLabels: {
            position: "top" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"]
        }
      },

      xaxis: {
        categories: [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec"
        ],
        position: "top",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true
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
          show: false,
          formatter: function (val) {
            return val + "%";
          }
        }
      },
      
    }
  });

  return (
    <div className="bg-white border rounded-[30px] shadow-sm  w-full p-10 mt-5 z-10">
      <div id="chart">
        <h1 className="font-[lato] text-2xl font-semibold mx-5 mb-4 ">
          Active Users
        </h1>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChart;