import { useState } from "react";
import { motion } from "framer-motion";
import BarChartTime from "@/components/charts/BarChartTime";
import HeatMap from "@/components/charts/HeatMap";
import BarChartStock from "@/components/charts/BarChartStock";
import Radar from "@/components/charts/RadarChart";
import { Tooltip } from "react-tooltip";

import { FaCircleInfo } from "react-icons/fa6";

import {
  performanceMatrix,
  metricWheel,
  trendCharts,
  correlationArc,
} from "@/constants/ToolTip";
import CorrelationArc from "../charts/CorrelationArc";

const options = [
  "Performance Matrix",
  "Metric Wheel",
  "Trend Chart(Stock Fixed)",
  "Trend Chart(Time Fixed)",
  "Correlation Arc",
];

const toolTipTexts = [
  performanceMatrix,
  metricWheel,
  trendCharts,
  correlationArc,
];

const Options = ({ option, className = "", onClick, toolTipText }) => {
  return (
    <motion.button
      className={`flex flex-wrap items-center py-3 px-5 gap-2 mt-2 mb-1 rounded-lg font-[lato] font-semibold text-md ${className}`}
      whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99, transition: { duration: 0.2 } }}
      onClick={onClick}
    >
      {option}
      <FaCircleInfo
        data-tooltip-id="tools-tooltip"
        data-tooltip-content={toolTipText}
      />
    </motion.button>
  );
};

const TripleEvaluator = ({
  response,
  history,
  selectedCondition,
  selectedTickers,
  fixedCondition1,
  fixedCondition2,
}) => {
  const [currentTool, setCurrentTool] = useState(0);

  // console.log(response);
  // console.log('Selected Condition : ',selectedCondition);
  // console.log('History',history);
  // console.log('Tickers',selectedTickers);

  return (
    <div className="flex flex-col h-full w-full ">
      <Tooltip id="visualizer-tooltip" />
      <div className="flex flex-row gap-2 mb-1 text-white mx-5 w-full ">
        {options.map((value, key) => {
          return (
            <Options
              key={key}
              option={value}
              className={`${currentTool == key ? "bg-white text-black" : "border-2"}`}
              onClick={() => setCurrentTool(key)}
              toolTipText={toolTipTexts[key]}
            />
          );
        })}
      </div>
      <div className="flex flex-col w-full h-full rounded-xl bg-[#f6f8fb]">
        {!response && (
          <div className="flex flex-col h-full items-center justify-center">
            <h1 className="font-[lato] font-bold text-xl">No Input found</h1>
            <p className="font-[lato] font-semibold text-md">
              Provide Input in the above fields to visualize
            </p>
          </div>
        )}
        {response && (
          <div className="flex flex-col">
            {currentTool === 0 && (
              <HeatMap
                history={history}
                data={response}
                conditions={selectedCondition.map(
                  (value) =>
                    `condition_${fixedCondition1}_${fixedCondition2}_${value.label}`
                )}
                tickers={selectedTickers}
              />
            )}
            {currentTool === 1 && (
              <Radar
                history={history}
                data={response}
                tickers={selectedTickers}
                conditions={selectedCondition.map(
                  (value) =>
                    `condition_${fixedCondition1}_${fixedCondition2}_${value.label}`
                )}
              />
            )}

            {currentTool === 2 && (
              <BarChartStock
                history={history}
                data={response}
                tickers={selectedTickers}
                conditions={selectedCondition.map(
                  (value) =>
                    `condition_${fixedCondition1}_${fixedCondition2}_${value.label}`
                )}
              />
            )}

            {currentTool === 3 && (
              <BarChartTime
                history={history}
                data={response}
                tickers={selectedTickers}
                conditions={selectedCondition.map(
                  (value) =>
                    `condition_${fixedCondition1}_${fixedCondition2}_${value.label}`
                )}
              />
            )}
            {currentTool === 4 && (
              <CorrelationArc
                history={history}
                response={response}
                tickers={selectedTickers}
                conditions={selectedCondition.map(
                  (value) =>
                    `condition_${fixedCondition1}_${fixedCondition2}_${value.label}`
                )}
                conditionListNumbers={selectedCondition.map(
                  (value) => value.label
                )}
                fixedConditions={[fixedCondition1, fixedCondition2]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripleEvaluator;
