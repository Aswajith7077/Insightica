import { metrics } from "@/constants/index.js";
import React, { useState, useEffect } from "react";
import Select from "react-select";

import { metricsMemo } from "@/constants/index.js";

import ApexSankey from "apexsankey";
// import Sample from '@/components/charts/temp';

// import ChordDiagram from 'react-chord-diagram';

// const data_ = {
//   nodes: [
//     { id: "England", title: "england" },
//     { id: "Wales", title: "wales" },
//     { id: "Level 4", title: "level 4" },
//     { id: "Level 3", title: "level 3" },
//     { id: "Level 2", title: "level 2" },
//     { id: "Level 1 and entry level", title: "level 1 and entry level" },
//     { id: "No qualifications", title: "no qualifications" },
//     { id: "Other", title: "other" },
//     { id: "Wholesale & retail", title: "wholesale & retail" },
//     { id: "Health & social work", title: "health & social work" },
//     { id: "Education", title: "education" },
//     { id: "Construction", title: "construction" },
//     { id: "Manufacturing", title: "manufacturing" },
//     { id: "Transport & storage", title: "transport & storage" },
//     { id: "Finance & insurance", title: "finance & insurance" }
//   ],
//   edges: [
//     { source: "England", target: "Level 4", value: 13 },
//     { source: "England", target: "Level 3", value: 8 },
//     { source: "England", target: "Level 2", value: 8 },
//     { source: "England", target: "Level 1 and entry level", value: 6 },
//     { source: "England", target: "No qualifications", value: 3 },
//     // { source: 'England', target: 'Other', value: 4 },
//     { source: "Wales", target: "Level 4", value: 7 },
//     { source: "Wales", target: "Level 3", value: 8 },
//     { source: "Wales", target: "Level 2", value: 4 },
//     { source: "Wales", target: "Level 1 and entry level", value: 5 },
//     { source: "Wales", target: "No qualifications", value: 5 }
//   ]
// };
const graphOptions = {
  nodeWidth: 20,
  fontFamily: "Quicksand, sans-serif",
  fontWeight: "600",
  edgeOpacity: 0.2
};

const handleData = (
  response,
  data,
  setData,
  history,
  metric,
  stock,
  conditionListNumbers,
  fixedConditions
) => {
  const hiskey = `history_${history}`;

  const nodes = [...fixedConditions, ...conditionListNumbers].map((value) => ({
    id: `condition_${value}`,
    title: `condition_${value}`
  }));
  const regex =
    fixedConditions.length <= 1
      ? /^condition_(\d+)_(\d+)$/
      : /^condition_(\d+)_(\d+)_(\d+)$/;
  const edges = [];

  Object.keys(response[hiskey]).map((value) => {
    const edgeWeight = response[hiskey][value][stock][metricsMemo[metric]];
    const result = value.match(regex);
    if (result) {
      // console.log(
      //   parseInt(result[1], 10),
      //   fixedConditions,
      //   fixedConditions.includes(parseInt(result[1], 10))
      // );
      if (fixedConditions.length === 1) {
        const src = "condition_" + result[1];
        // if (fixedConditions.includes(parseInt(result[1], 10))) {
          const dest = "condition_" + result[2];
          edges.push({
            source: src,
            target: dest,
            value: edgeWeight !== 0 ? edgeWeight : -0.01
          });
        // }
      } else if (fixedConditions.length === 2) {
        const src = "condition_" + result[1];
        const via = "condition_" + result[2];
        const dest = "condition_" + result[3];
        if (fixedConditions.includes(parseInt(result[1], 10))) {
          // const dest = "condition_" + result[2];
          edges.push({
            source: src,
            target: dest,
            value: edgeWeight !== 0 ? edgeWeight : -0.01
          });
          edges.push({
            source: src,
            target: via,
            value: edgeWeight !== 0 ? edgeWeight : -0.01
          });
          edges.push({
            source: via,
            target: dest,
            value: edgeWeight !== 0 ? edgeWeight : -0.01
          });
        }
      }
    }
  });

  setData({
    nodes: nodes,
    edges: edges
  });
  console.log(data);
};

const CorrelationArc = ({
  history,
  tickers,
  response,
  conditions,
  conditionListNumbers,
  fixedConditions
}) => {
  const [selectedHistory, setSelectedHistory] = useState(1);
  const [selectedMetric, setMetric] = useState(metrics[0]);
  const [selectedStock, setStock] = useState(tickers[0]);

  console.log(history, tickers);
  console.log(response, conditions);
  console.log(conditionListNumbers, fixedConditions);

  // console.log(selectedHistory, selectedMetric, selectedStock);
  // console.log("Data : ", data, conditions);
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [screenHeight, setScreenHeight] = useState(window.innerHeight);

  const [data, setData] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
      setScreenHeight(window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    handleData(
      response,
      data,
      setData,
      selectedHistory,
      selectedMetric,
      selectedStock,
      conditionListNumbers,
      fixedConditions
    );
  }, [response, selectedHistory, selectedMetric, selectedStock]);

  useEffect(() => {
    document.getElementById("diagram").innerHTML = "";
    if (data === null || data === undefined) return;
    // console.log(
    //   document.getElementById("diagram").style.width - 10,
    //   document.getElementById("diagram").style.height
    // );
    const options = {
      width: screenWidth - 1000,
      // height: screenHeight - 1000,
      ...graphOptions
    };
    // console.log('Render Data : ',data)
    // console.log('Original Data : ',data_)
    const s = new ApexSankey(document.getElementById("diagram"), options);
    s.render(data);
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="mx-[5%]">
        <div className="flex flex-col md:flex-row gap-5 my-10">
          <input
            type="number"
            min={1}
            value={selectedHistory}
            max={history - 1 ? history - 1 : history}
            onChange={(e) => {
              setSelectedHistory(
                e.target.value !== undefined ? e.target.value : selectedHistory
              );
            }}
            className="w-full border-2 border-[#dce1e7] rounded-lg outline-none px-3 py-1 font-[lato] font-semibold"
          />
          <Select
            options={metrics.map((val) => ({ label: val, value: val }))}
            defaultValue={metrics[0]}
            onChange={(value) => {
              return setMetric(
                value !== undefined ? metricsMemo[value.label] : selectedMetric
              );
            }}
            className="w-full bg-white font-[source sans 3] font-semibold text-md"
          />
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row mx-[5%] border-none min-w-[70rem] min-h-[50rem]"
        id="diagram"
      ></div>
    </div>
  );
};

export default CorrelationArc;
