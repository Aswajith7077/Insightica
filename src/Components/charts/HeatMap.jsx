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
    // Range from -100 to -4 with interval of 5
    { from: -100, to: -95, color: "#1f77b4" }, // Blue
    { from: -95, to: -90, color: "#ff7f0e" }, // Orange
    { from: -90, to: -85, color: "#2ca02c" }, // Green
    { from: -85, to: -80, color: "#d62728" }, // Red
    { from: -80, to: -75, color: "#9467bd" }, // Purple
    { from: -75, to: -70, color: "#8c564b" }, // Brown
    { from: -70, to: -65, color: "#e377c2" }, // Pink
    { from: -65, to: -60, color: "#7f7f7f" }, // Gray
    { from: -60, to: -55, color: "#bcbd22" }, // Yellow-Green
    { from: -55, to: -50, color: "#17becf" }, // Cyan
    { from: -50, to: -45, color: "#1abc9c" }, // Turquoise
    { from: -45, to: -40, color: "#f39c12" }, // Orange
    { from: -40, to: -35, color: "#e74c3c" }, // Alizarin
    { from: -35, to: -30, color: "#3498db" }, // Peter River
    { from: -30, to: -25, color: "#2ecc71" }, // Emerald
    { from: -25, to: -20, color: "#9b59b6" }, // Amethyst
    { from: -20, to: -15, color: "#ff5733" }, // Bright Red-Orange
    { from: -15, to: -10, color: "#33ff57" }, // Bright Green
    { from: -10, to: -5, color: "#5733ff" }, // Vivid Blue
    { from: -5, to: -4, color: "#ffd700" }, // Gold

    // Range from -3 to 3 with interval of 0.05
    // Range from -3 to 3 with interval of 0.05
    { from: -3, to: -2.95, color: "#ff4500" }, // Orange Red
    { from: -2.95, to: -2.90, color: "#ffa500" }, // Orange
    { from: -2.90, to: -2.85, color: "#ffd700" }, // Gold
    { from: -2.85, to: -2.80, color: "#adff2f" }, // Green-Yellow
    { from: -2.80, to: -2.75, color: "#7fff00" }, // Chartreuse
    { from: -2.75, to: -2.70, color: "#00ff00" }, // Lime
    { from: -2.70, to: -2.65, color: "#32cd32" }, // Lime Green
    { from: -2.65, to: -2.60, color: "#00fa9a" }, // Medium Spring Green
    { from: -2.60, to: -2.55, color: "#00ffff" }, // Aqua
    { from: -2.55, to: -2.50, color: "#1e90ff" }, // Dodger Blue
    { from: -2.50, to: -2.45, color: "#0000ff" }, // Blue
    { from: -2.45, to: -2.40, color: "#8a2be2" }, // Blue Violet
    { from: -2.40, to: -2.35, color: "#da70d6" }, // Orchid
    { from: -2.35, to: -2.30, color: "#ff00ff" }, // Magenta
    { from: -2.30, to: -2.25, color: "#ff1493" }, // Deep Pink
    { from: -2.25, to: -2.20, color: "#ff69b4" }, // Hot Pink
    { from: -2.20, to: -2.15, color: "#ffb6c1" }, // Light Pink
    { from: -2.15, to: -2.10, color: "#ffc0cb" }, // Pink
    { from: -2.10, to: -2.05, color: "#ffdab9" }, // Peach Puff
    { from: -2.05, to: -2.00, color: "#ffe4b5" }, // Moccasin
    { from: -2.00, to: -1.95, color: "#800000" }, // Maroon
    { from: -1.95, to: -1.90, color: "#808000" }, // Olive
    { from: -1.90, to: -1.85, color: "#008000" }, // Green
    { from: -1.85, to: -1.80, color: "#008080" }, // Teal
    { from: -1.80, to: -1.75, color: "#000080" }, // Navy
    { from: -1.75, to: -1.70, color: "#4b0082" }, // Indigo
    { from: -1.70, to: -1.65, color: "#800080" }, // Purple
    { from: -1.65, to: -1.60, color: "#ff4500" }, // Orange Red
    { from: -1.60, to: -1.55, color: "#ffa500" }, // Orange
    { from: -1.55, to: -1.50, color: "#ffd700" }, // Gold
    { from: -1.50, to: -1.45, color: "#adff2f" }, // Green-Yellow
    { from: -1.45, to: -1.40, color: "#7fff00" }, // Chartreuse
    { from: -1.40, to: -1.35, color: "#00ff00" }, // Lime
    { from: -1.35, to: -1.30, color: "#32cd32" }, // Lime Green
    { from: -1.30, to: -1.25, color: "#00fa9a" }, // Medium Spring Green
    { from: -1.25, to: -1.20, color: "#00ffff" }, // Aqua
    { from: -1.20, to: -1.15, color: "#1e90ff" }, // Dodger Blue
    { from: -1.15, to: -1.10, color: "#0000ff" }, // Blue
    { from: -1.10, to: -1.05, color: "#8a2be2" }, // Blue Violet
    { from: -1.05, to: -1.00, color: "#da70d6" }, // Orchid
    { from: -1.00, to: -0.95, color: "#ff00ff" }, // Magenta
    { from: -0.95, to: -0.90, color: "#ff1493" }, // Deep Pink
    { from: -0.90, to: -0.85, color: "#ff69b4" }, // Hot Pink
    { from: -0.85, to: -0.80, color: "#ffb6c1" }, // Light Pink
    { from: -0.80, to: -0.75, color: "#ffc0cb" }, // Pink
    { from: -0.75, to: -0.70, color: "#ffdab9" }, // Peach Puff
    { from: -0.70, to: -0.65, color: "#ffe4b5" }, // Moccasin
    { from: -0.65, to: -0.60, color: "#800000" }, // Maroon
    { from: -0.60, to: -0.55, color: "#808000" }, // Olive
    { from: -0.55, to: -0.50, color: "#008000" }, // Green
    { from: -0.50, to: -0.45, color: "#008080" }, // Teal
    { from: -0.45, to: -0.40, color: "#000080" }, // Navy
    { from: -0.40, to: -0.35, color: "#4b0082" }, // Indigo
    { from: -0.35, to: -0.30, color: "#800080" }, // Purple
    { from: -0.30, to: -0.25, color: "#ff4500" }, // Orange Red
    { from: -0.25, to: -0.20, color: "#ffa500" }, // Orange
    { from: -0.20, to: -0.15, color: "#ffd700" }, // Gold
    { from: -0.15, to: -0.10, color: "#adff2f" }, // Green-Yellow
    { from: -0.10, to: -0.05, color: "#7fff00" }, // Chartreuse
    { from: -0.05, to: 0.00, color: "#00ff00" }, // Lime
    { from: 0.00, to: 0.05, color: "#32cd32" }, // Lime Green
    { from: 0.05, to: 0.10, color: "#00fa9a" }, // Medium Spring Green
    { from: 0.10, to: 0.15, color: "#00ffff" }, // Aqua
    { from: 0.15, to: 0.20, color: "#1e90ff" }, // Dodger Blue
    { from: 0.20, to: 0.25, color: "#0000ff" }, // Blue
    { from: 0.25, to: 0.30, color: "#8a2be2" }, // Blue Violet
    { from: 0.30, to: 0.35, color: "#da70d6" }, // Orchid
    { from: 0.35, to: 0.40, color: "#ff00ff" }, // Magenta
    { from: 0.40, to: 0.45, color: "#ff1493" }, // Deep Pink
    { from: 0.45, to: 0.50, color: "#ff69b4" }, // Hot Pink
    { from: 0.50, to: 0.55, color: "#ffb6c1" }, // Light Pink
    { from: 0.55, to: 0.60, color: "#ffc0cb" }, // Pink
    { from: 0.60, to: 0.65, color: "#ffdab9" }, // Peach Puff
    { from: 0.65, to: 0.70, color: "#ffe4b5" }, // Moccasin
    { from: 0.70, to: 0.75, color: "#800000" }, // Maroon
    { from: 0.75, to: 0.80, color: "#808000" }, // Olive
    { from: 0.80, to: 0.85, color: "#008000" }, // Green
    { from: 0.85, to: 0.90, color: "#008080" }, // Teal
    { from: 0.90, to: 0.95, color: "#000080" }, // Navy
    { from: 0.95, to: 1.00, color: "#4b0082" }, // Indigo
    { from: 1.00, to: 1.05, color: "#800080" }, // Purple
    { from: 1.05, to: 1.10, color: "#ff4500" }, // Orange Red
    { from: 1.10, to: 1.15, color: "#ffa500" }, // Orange
    { from: 1.15, to: 1.20, color: "#ffd700" }, // Gold
    { from: 1.20, to: 1.25, color: "#adff2f" }, // Green-Yellow
    { from: 1.25, to: 1.30, color: "#7fff00" }, // Chartreuse
    { from: 1.30, to: 1.35, color: "#00ff00" }, // Lime
    { from: 1.35, to: 1.40, color: "#32cd32" }, // Lime Green
    { from: 1.40, to: 1.45, color: "#00fa9a" }, // Medium Spring Green
    { from: 1.45, to: 1.50, color: "#00ffff" }, // Aqua
    { from: 1.50, to: 1.55, color: "#1e90ff" }, // Dodger Blue
    { from: 1.55, to: 1.60, color: "#0000ff" }, // Blue
    { from: 1.60, to: 1.65, color: "#8a2be2" }, // Blue Violet
    { from: 1.65, to: 1.70, color: "#da70d6" }, // Orchid
    { from: 1.70, to: 1.75, color: "#ff00ff" }, // Magenta
    { from: 1.75, to: 1.80, color: "#ff1493" }, // Deep Pink
    { from: 1.80, to: 1.85, color: "#ff69b4" }, // Hot Pink
    { from: 1.85, to: 1.90, color: "#ffb6c1" }, // Light Pink
    { from: 1.90, to: 1.95, color: "#ffc0cb" }, // Pink
    { from: 1.95, to: 2.00, color: "#ffdab9" }, // Peach Puff
    { from: 2.00, to: 3.00, color: "#ffe4b5" }, // Moccasin

    // Range from 4 to 50 with interval of 5
    { from: 4, to: 9, color: "#ea5eae" }, // Hot Pink
    { from: 9, to: 14, color: "#33fff0" }, // Cyan
    { from: 14, to: 19, color: "#8b4513" }, // Saddle Brown
    { from: 19, to: 24, color: "#ff6347" }, // Tomato Red
    { from: 24, to: 29, color: "#4682b4" }, // Steel Blue
    { from: 29, to: 34, color: "#4b0082" }, // Indigo
    { from: 34, to: 39, color: "#adff2f" }, // Green-Yellow
    { from: 39, to: 44, color: "#dc143c" }, // Crimson
    { from: 44, to: 49, color: "#20b2aa" }, // Light Sea Green
    { from: 49, to: 50, color: "#ff8c00" }  // Dark Orange
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
