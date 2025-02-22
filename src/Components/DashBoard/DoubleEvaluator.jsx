import { Component, useState, useEffect } from "react";

import { motion } from "framer-motion";
import BarChartTime from "@/components/charts/BarChartTime";
import HeatMap from "@/components/charts/HeatMap";
import BarChartStock from "@/components/charts/BarChartStock";
import Radar from "@/components/charts/RadarChart";
import { Tooltip } from "react-tooltip";
import CorrelationArc from "@/components/charts/CorrelationArc";

import { FaCircleInfo } from "react-icons/fa6";

import {
  performanceMatrix,
  metricWheel,
  trendCharts,
  correlationArc,
} from "@/constants/ToolTip";
import * as PropTypes from "prop-types";

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

class Options extends Component {
  render() {
    let { option, className, onClick, toolTipText } = this.props;
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
          data-tooltip-place={"bottom"}
          className={"outline-none"}
        />
      </motion.button>
    );
  }
}

Options.propTypes = {
  option: PropTypes.any,
  className: PropTypes.string,
  onClick: PropTypes.any,
  toolTipText: PropTypes.any,
};

Options.defaultProps = { className: "" };

const DoubleEvaluator = (x) => {
  const [currentTool, setCurrentTool] = useState(0);

  // console.log('Fixed , Selected : ',x.fixedCondition,x.selectedCondition);

  useEffect(() => {
    console.log("Current Tool : ", currentTool);
  }, [currentTool]);

  // x.selectedCondition.map((value) => {
  //                 console.log(`condition_${x.fixedCondition}_${value.label}`);
  //               })

  return (
    <div className="flex flex-col w-full h-full ">
      <Tooltip id="visualizer-tooltip" />
      <div className="flex flex-row gap-2 mb-1 text-white mx-5 w-full ">
        {options.map((value, key) => {
          return (
            <Options
              key={key}
              option={value}
              className={`${currentTool === key ? "bg-white text-black" : "border-2"}`}
              onClick={() => setCurrentTool(key)}
              toolTipText={toolTipTexts[key]}
            />
          );
        })}
      </div>
      <div className="flex flex-col w-full h-full rounded-xl bg-[#f6f8fb]">
        {!x.response && (
          <div className="flex flex-col h-full items-center justify-center">
            <h1 className="font-[lato] font-bold text-xl">No Input found</h1>
            <p className="font-[lato] font-semibold text-md">
              Provide Input in the above fields to visualize
            </p>
          </div>
        )}
        {x.response && (
          <div className="flex flex-col">
            {currentTool === 0 && (
              <HeatMap
                history={x.history}
                data={x.response}
                conditions={x.selectedCondition.map((value) => {
                  return `condition_${x.fixedCondition}_${value.label}`;
                })}
                tickers={x.selectedTickers}
              />
            )}
            {currentTool === 1 && (
              <Radar
                history={x.history}
                data={x.response}
                tickers={x.selectedTickers}
                conditions={x.selectedCondition.map((value) => {
                  return value !== x.fixedCondition
                    ? `condition_${x.fixedCondition}_${value.label}`
                    : "";
                })}
              />
            )}

            {currentTool === 2 && (
              <BarChartStock
                history={x.history}
                data={x.response}
                tickers={x.selectedTickers}
                conditions={x.selectedCondition.map((value) => {
                  return value !== x.fixedCondition
                    ? `condition_${x.fixedCondition}_${value.label}`
                    : "";
                })}
              />
            )}

            {currentTool === 3 && (
              <BarChartTime
                history={x.history}
                data={x.response}
                tickers={x.selectedTickers}
                conditions={x.selectedCondition.map((value) => {
                  return `condition_${x.fixedCondition}_${value.label}`;
                })}
              />
            )}
            {currentTool === 4 && (
              <CorrelationArc
                history={x.history}
                response={x.response}
                tickers={x.selectedTickers}
                conditions={x.selectedCondition.map(
                  (value) => `condition_${x.fixedCondition}_${value.label}`
                )}
                conditionListNumbers={x.selectedCondition.map(
                  (value) => value.label
                )}
                fixedConditions={[x.fixedCondition]}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DoubleEvaluator;
