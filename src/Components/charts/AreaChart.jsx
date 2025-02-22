import { useState } from "react";
import ReactApexChart from "react-apexcharts";


const series = {
    months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    values:[12.23,17.32,13.3,23.43,34.56,32.34,12.34,34.45,45.4,34.56,54.65,56.75]
}

const getSeries = (size) => {
  return [
    {
      name: "STOCK ABC",
      data: series.values.slice(0,size)
    }
  ]
}

const getOptions = () => {
  return {
    chart: {
      type: "area",
      height: 350,

      toolbar: {
        show: false
      }
    },
    theme: {
      fontFamily: "Lato, sans-serif", // Custom font family
      fontSize: "14px" // Global font size
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#FFFFFF"], // Text color
        fontSize: "14px", // Custom font size
        fontFamily: "Lato, sans-serif", // Custom font family
        fontWeight: "bold" // Optional: Change font weight
      },
      dropShadow: {
        enabled: false // Disable shadows on the text
      }
    },
    stroke: {
      curve: "straight"
    },

    labels: series.months,
    xaxis: {
      type: "double",
      enabled: false,
      position:"bottom"
    },
    yaxis: {
      opposite: false
    },
    legend: {
      horizontalAlign: "left",
      topAlign: "bottom"
    }
  };
}

const AreaChart = () => {
  // const [state, setState] = useState({});

  return (
    <div className="flex flex-col bg-white border rounded-2xl shadow-sm w-full px-4 pt-10 pb-2 -z-0">
      <div id="chart">
        <h1 className="mx-3 font-[lato] text-2xl font-semibold mb-4">
          Development Activity
        </h1>
        <div className="hidden md:block">
          <ReactApexChart
            options={getOptions()}
            series={getSeries(series.months.length)}
            type="area"
            height={200}
          />
        </div>
        <div className="block md:hidden">
          <ReactApexChart
            options={getOptions()}
            series={getSeries(5)}
            type="area"
            height={300}
          />
        </div>
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart;