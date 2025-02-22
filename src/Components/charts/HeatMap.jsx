import React, {useEffect, useState} from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { metrics, metricsMemo } from "@/constants";
import { Slider } from "@mui/material";

// Define color ranges inspired by Matplotlib's 'viridis'

const getRanges = (start,end,divisions) => {
  const result = [];
  const step = (end - start)/divisions;

  for(let i = start;i < start + divisions * end;i += step)
    result.push(i);
  return result;
}



const HeatMap = (x) => {
  const [selectedMetric, setMetric] = useState(metricsMemo[metrics[0]]);
  const [selectedHistory, setSelectedHistory] = useState(1);
  const series = [];

  const [colorRanges, setColorRanges] = useState([
    { from: -20, to: -15, color: "#ff5733" }, // Bright Red-Orange
    { from: -15, to: -10, color: "#33ff57" }, // Bright Green
    { from: -10, to: -5, color: "#5733ff" }, // Vivid Blue
    { from: -5, to: 0, color: "#ffd700" }, // Gold
    { from: 0, to: 5, color: "#ea5eae" }, // Hot Pink
    { from: 5, to: 10, color: "#33fff0" }, // Cyan
    { from: 10, to: 15, color: "#8b4513" }, // Saddle Brown
    { from: 15, to: 20, color: "#ff6347" }, // Tomato Red
    { from: 20, to: 25, color: "#4682b4" }, // Steel Blue
    { from: 25, to: 30, color: "#4b0082" }, // Indigo
    { from: 30, to: 35, color: "#adff2f" }, // Green-Yellow
    { from: 35, to: 40, color: "#dc143c" }, // Crimson
    { from: 40, to: 45, color: "#20b2aa" }, // Light Sea Green
    { from: 45, to: 50, color: "#ff8c00" }  // Dark Orange
  ]);



  const [options,setOptions] = useState({
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
        colors: ["#FFFFFF"], // Text color
        fontSize: "14px", // Custom font size
        fontFamily: "Lato, sans-serif", // Custom font family
        fontWeight: "bold", // Optional: Change font weight
      },
      dropShadow: {
        enabled: false, // Disable shadows on the text
      },
    },
    theme: {
      fontFamily: "Lato, sans-serif", // Custom font family
      fontSize: "14px", // Global font size
    },
    xaxis: {
      type: "category",
    },
  });


  console.log(x.data);
  if (!x.data || x.data.length === 0) return null;

  // useEffect(() => {
  //   setOptions(() => ({
  //     chart: {
  //       type: "heatmap",
  //       toolbar: {
  //         show: false,
  //       },
  //     },
  //     stroke: {
  //       width: 0,
  //     },
  //     plotOptions: {
  //       heatmap: {
  //         radius: 0, // Square blocks like Matplotlib
  //         enableShades: false,
  //         colorScale: {
  //           ranges: colorRanges,
  //         },
  //       },
  //     },
  //     dataLabels: {
  //       enabled: true,
  //       style: {
  //         colors: ["#FFFFFF"], // Text color
  //         fontSize: "14px", // Custom font size
  //         fontFamily: "Lato, sans-serif", // Custom font family
  //         fontWeight: "bold", // Optional: Change font weight
  //       },
  //       dropShadow: {
  //         enabled: false, // Disable shadows on the text
  //       },
  //     },
  //     theme: {
  //       fontFamily: "Lato, sans-serif", // Custom font family
  //       fontSize: "14px", // Global font size
  //     },
  //     xaxis: {
  //       type: "category",
  //     },
  //   }));
  // },[colorRanges]);


  try {
    var max_value = 0;
    var min_value = Math.infinity;
    x.conditions.forEach((value) => {
      const lister = x.data[`history_${selectedHistory}`];
      let data = [];
      Object.keys(lister[value]).forEach((prop) => {
        const temp = lister[value][prop][selectedMetric];
        max_value = Math.max(max_value, temp);
        min_value = Math.max(min_value, temp);
        if (temp !== undefined) {
          data.push({ x: prop, y: temp });
        }
      });
      series.push({
        name: value,
        data,
      });
    });

    // const ranges = getRanges(min_value,max_value ,6);
    // console.log(ranges);
    // setColorRanges([
    //   {from: ranges[0],to: ranges[1],color: "#21908d"},
    //   {from: ranges[1],to: ranges[2],color: "#5dc963"},
    //   {from: ranges[2],to: ranges[3],color: "#fde725"},
    //   {from: ranges[3],to: ranges[4],color: "#f26123"},
    //   {from: ranges[4],to: ranges[5],color: "#21908d"},
    //   {from: ranges[5],to: max_value,color: "#440154"},
    // ]);
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

            <Slider
              value={selectedHistory}
              onChange={(e, val) =>
                setSelectedHistory(val ? val : selectedHistory)
              }
              valueLabelDisplay="auto"
              min={1}
              max={x.history - 1 ? x.history - 1 : x.history}
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
                    : selectedMetric,
                );
              }}
              className="bg-white font-[lato] font-semibold text-md"
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
