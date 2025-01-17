import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { metrics, metricsMemo } from "@/constants";

// Define color ranges inspired by Matplotlib's 'viridis'
const colorRanges = [
  { from: -100, to: -50, color: "#440154" },
  { from: -50, to: -25, color: "#3b528b" },
  { from: -25, to: 0, color: "#21908d" },
  { from: 0, to: 25, color: "#5dc963" },
  { from: 25, to: 50, color: "#fde725" },
];

const options = {
  chart: {
    type: "heatmap",
    toolbar: {
      show: false,
    },
  },
  stroke: {
    width: 0,
  },
  plotOptions: {
    heatmap: {
      radius: 0, // Square blocks like Matplotlib
      enableShades: false,
      colorScale: {
        ranges: colorRanges,
      },
    },
  },
  dataLabels: {
    enabled: true,
    style: {
      colors: ["#fff"],
    },
  },
  xaxis: {
    type: "category",
  },
};

const HeatMap = (x) => {
  const [selectedMetric, setMetric] = useState(metricsMemo[metrics[0]]);
  const [selectedHistory, setSelectedHistory] = useState(1);
  const series = [];
  console.log(x.data);
  if (!x.data || x.data.length === 0) return null;

  try {
    x.conditions.forEach((value) => {
      const lister = x.data[`history_${selectedHistory}`];
      let data = [];
      Object.keys(lister[value]).forEach((prop) => {
        const temp = lister[value][prop][selectedMetric];
        if (temp !== undefined) {
          data.push({ x: prop, y: temp });
        }
      });
      series.push({
        name: value,
        data,
      });
    });
  } catch (e) {
    console.error("Error:", e.message);
    return null;
  }

  return (
    <div className="flex flex-col">
      <div className="mx-[5%]">
        <div className="flex flex-col md:flex-row gap-5 my-10">
          <div className="w-1/2">
            <h2 className="font-semibold font-[lato] text-lg my-3">
              Select a Time (History)
            </h2>
            <input
              type="number"
              min={1}
              value={selectedHistory}
              max={x.history - 1 ? x.history - 1 : x.history}
              onChange={(e) => {
                setSelectedHistory(
                  e.target.value !== undefined
                    ? e.target.value
                    : selectedHistory
                );
              }}
              className="w-full border-2 border-[#dce1e7] rounded-2xl outline-none px-3 py-3 font-[lato] font-semibold"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="font-semibold font-[lato] text-lg my-3">
              Metric Selector
            </h2>
            <Select
              options={metrics.map((val) => ({ label: val, value: val }))}
              onChange={(value) => {
                return setMetric(
                  value !== undefined
                    ? metricsMemo[value.label]
                    : selectedMetric
                );
              }}
              className="bg-white font-[source sans 3] font-semibold text-md"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-[5%]">
        <h2 className="font-semibold font-[lato] text-lg my-3">
          Performance Matrix (Stocks vs Conditions)
        </h2>
        <div
          id="heatmap"
          className="w-full my-5 md:mr-5 p-10 bg-white border-2 border-[#dce1e7] rounded-3xl"
        >
          <ReactApexChart
            options={options}
            series={series}
            type="heatmap"
            height={450}
          />
        </div>
      </div>
    </div>
  );
};

export default HeatMap;
