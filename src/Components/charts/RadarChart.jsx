import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { Slider } from "@mui/material";

const Radar = (x) => {
  const [selectedStock, setSelectedStock] = useState(x.tickers[0]);
  const [selectedHistory, setSelectedHistory] = useState(1);

  if (!x.data) return null;

  const lister = x.data[`history_${selectedHistory}`]; // ✅ Fixed template literals
  if (!lister) return null;

  const conditions = Object.keys(lister); // Extract condition names (cond1, cond2, etc.)

  // Extract metrics from any first condition (assuming all conditions have the same metrics)
  const sampleStockData = lister[conditions[0]]?.[selectedStock];
  if (!sampleStockData) return null;

  const metricCategories = Object.keys(sampleStockData); // Extract metric names (metric1, metric2, etc.)

  // ✅ Switch roles: Now, metrics become series & conditions become categories (x-axis)
  let series = metricCategories.map((metric) => ({
    name: metric, // Each metric becomes a separate line in the radar chart
    data: conditions.map((condition) => lister[condition][selectedStock][metric] || 0),
  }));

  const radarOptions = {
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 2,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 4,
      hover: {
        size: 6,
      },
    },
    yaxis: {
      stepSize: 20,
    },
    xaxis: {
      categories: conditions, // ✅ Conditions are now the X-axis labels
    },
    dataLabels: {
      enabled: false,
    },
    theme: {
      fontFamily: "Lato, sans-serif",
      fontSize: "14px",
    },
    tooltip: {
      enabled: true,
      shared: false,
      intersect: true,
      followCursor: true,
      y: {
        formatter: (value) => `${value.toFixed(2)}`,
        title: {
          formatter: (seriesName) => seriesName,
        },
      },
      marker: {
        show: true,
      },
    },
  };

  return (
      <div className="flex flex-col">
        <div className="mx-[5%]">
          <div className="flex flex-col md:flex-row gap-5 my-10">
            <div className="w-1/2 flex flex-col">
              <h2 className="font-semibold font-[lato] text-lg my-3">History Selector</h2>
              <Slider
                  value={selectedHistory}
                  onChange={(e, val) => setSelectedHistory(val || selectedHistory)}
                  valueLabelDisplay="auto"
                  min={1}
                  max={x.history - 1 || x.history}
              />
            </div>
            <div className="flex flex-col w-1/2">
              <h2 className="font-semibold font-[lato] text-lg my-3">Stock Selector</h2>
              <Select
                  options={x.tickers.map((val) => ({ label: val, value: val }))}
                  defaultValue={selectedStock}
                  onChange={(value) => setSelectedStock(value ? value.label : selectedStock)}
                  className="w-full bg-white font-[lato] font-semibold text-md"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col mx-[5%]">
          <h2 className="font-semibold font-[lato] text-lg my-3">Radar Chart</h2>
          <div
              id="heatmap"
              className="w-full my-5 p-10 bg-white border-2 border-[#dce1e7] rounded-3xl"
          >
            <ReactApexChart
                options={radarOptions}
                series={series}
                type="radar"
                height={650}
            />
          </div>
        </div>
      </div>
  );
};

export default Radar;
