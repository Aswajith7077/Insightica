import { useState } from "react";
import ReactApexChart from "react-apexcharts";


const series = {
    months:['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    values:[12.23,17.32,13.3,23.43,34.56,32.34,12.34,34.45,45.4,34.56,54.65,56.75]
}

const AreaChart = () => {
  const [state, setState] = useState({
    series: [
      {
        name: "STOCK ABC",
        data: series.values
      }
    ],
    options: {
      chart: {
        type: "area",
        height: 350,
        
        toolbar: {
          show: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },

      subtitle: {
        text: "Price Movements",
        align: "left"
      },
      labels: series.months,
      xaxis: {
        type: "double",
        enabled: false
      },
      yaxis: {
        opposite: true
      },
      legend: {
        horizontalAlign: "left"
      }
    }
  });

  return (
    <div className="w-full bg-white border rounded-[30px] mt-5 shadow-sm p-10 z-10">
      <div id="chart">
        <h1 className="font-[lato] text-2xl font-semibold mb-4">
          Development Activity
        </h1>
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="area"
          height={200}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AreaChart;