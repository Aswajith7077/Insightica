import { metrics } from "@/constants/index.js";
import React, { useState, useEffect } from "react";
import Select from "react-select";

import { metricsMemo } from "@/constants/index.js";

import ApexSankey from "apexsankey";
import {Slider} from "@mui/material";


const graphOptions = {
  nodeWidth: 20,
  fontFamily: "Quicksand, sans-serif",
  fontWeight: "600",
  edgeOpacity: 0.2,
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
    title: `condition_${value}`,
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

      if (fixedConditions.length === 1) {
        const src = "condition_" + result[1];
        // if (fixedConditions.includes(parseInt(result[1], 10))) {
        const dest = "condition_" + result[2];
        edges.push({
          source: src,
          target: dest,
          value: edgeWeight !== 0 ? edgeWeight : -0.01,
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
            value: edgeWeight !== 0 ? edgeWeight : -0.01,
          });
          edges.push({
            source: src,
            target: via,
            value: edgeWeight !== 0 ? edgeWeight : -0.01,
          });
          edges.push({
            source: via,
            target: dest,
            value: edgeWeight !== 0 ? edgeWeight : -0.01,
          });
        }
      }
    }
  });

  setData({
    nodes: nodes,
    edges: edges,
  });
  console.log(data);
};

const CorrelationArc = ({
  history,
  tickers,
  response,
  conditions,
  conditionListNumbers,
  fixedConditions,
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

    const options = {
      width: screenWidth - 1000,
      ...graphOptions,
    };

    const s = new ApexSankey(document.getElementById("diagram"), options);
    s.render(data);
  }, [data]);

  return (
    <div className="flex flex-col">
      <div className="mx-[5%]">
        <div className="flex flex-col md:flex-row gap-5 my-10">
          <div className={'flex flex-col w-full gap-5'}>
            <h2 className={'font-[lato] font-semibold text-lg '}>History</h2>
            <Slider
                value={selectedHistory}
                onChange={(e, val) =>
                  setSelectedHistory(val ? val : selectedHistory)
              }
              valueLabelDisplay="auto"
              min={1}
              max={history - 1 ? history - 1 : history}
          />
          </div>
          <div className={'flex w-full flex-col gap-5'}><h2 className={'font-[lato] font-semibold text-lg '}>Metrics</h2>
          <Select
            options={metrics.map((val) => ({ label: val, value: val }))}
            defaultValue={metrics[0]}
            onChange={(value) => {
              return setMetric(
                value !== undefined ? metricsMemo[value.label] : selectedMetric
              );
            }}
            className="w-full bg-white font-[lato] font-semibold text-md"
          />
          </div>
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
