import { Component, useEffect, useState } from "react";
import { metrics, tickers, toolsMap ,tools,tickerMetrics} from "@/constants/index.js";
import { motion } from "framer-motion";
import Select from "react-select";
import axios from "axios";
import Config from "/config/config";
import {
  toolTipTexts,
} from "@/constants/ToolTip";

import * as PropTypes from "prop-types";
import StockSelect from "@/components/tools/StockSelect";



const serverUrl = Config.serverUrl;
const singleEvaluatorUrl = Config.singleEvalUrl;
const doubleEvaluatorUrl = Config.doubleEvalUrl;
const tripleEvaluatorUrl = Config.tripleEvalUrl;
const backTestUrl = Config.backTestUrl;
const singlePredictorUrl = Config.singlePredUrl;





const stocks = tickers.map((value) => {
  return {
    label: value,
    value: value,
  };
});

const handleSubmit = async (
  singleReq,
  doubleReq,
  tripleReq,
  singlePredictorReq,
  backTestReq,
  setSingleResponse,
  setDoubleResponse,
  setTripleResponse,
  setSinglePredictorResponse,
  setBackTestResponse,
  setHistory,
  selectedTool,
) => {

  console.log(toolsMap[selectedTool]);
  if (toolsMap[selectedTool] === "SINGLE_EVAL") {

    axios
      .post(`${serverUrl}${singleEvaluatorUrl}`, singleReq)
      .then((res) => {
        setSingleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err.message));
  } else if (toolsMap[selectedTool] === "DOUBLE_EVAL") {

    axios
      .post(`${serverUrl}${doubleEvaluatorUrl}`, doubleReq)
      .then((res) => {
        setDoubleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err));
  } else if (toolsMap[selectedTool] === "TRIPLE_EVAL") {
    // console.log(tripleReq);
    axios
      .post(`${serverUrl}${tripleEvaluatorUrl}`, tripleReq)
      .then((res) => {
        console.log(res);
        setTripleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err));
  } else if (toolsMap[selectedTool] === "SINGLE_PRED") {
    axios
      .post(`${serverUrl}${singlePredictorUrl}`, singlePredictorReq)
      .then((res) => {
        setSinglePredictorResponse(res.data);
      });
  } else if (toolsMap[selectedTool] === "BACK_TEST") {
    axios
      .post(`${serverUrl}${backTestUrl}`, singlePredictorReq)
      .then((response) => {
        setBackTestResponse(response.data);
      });
  }
};

class StaticInput extends Component {
  render() {
    let {
      setDrawerState,
      fixedCondition1,
      fixedCondition2,
      setFixedCondition1,
      setFixedCondition2,
      setCondition,
      setTickerId,
      setTickers,
      setDuration,
      setSingleResponse,
      setDoubleResponse,
      setTripleResponse,
      setBackTestResponse,
      setSinglePredictorResponse,
      setHistory,
      conditions,
      tickerId,
      duration,
      singleReq,
      doubleReq,
      singlePredictorReq,
      backTestReq,
      setSinglePredictorReq,
      setBackTestReq,
      tripleReq,
      selectedTool,
      tickerMetric,
      setTickerMetric,
      singleStock,
      setSingleStock,
      whatToOptimize,
      setWhatToOptimize,
      stoploss,
      setStoploss,
      brokerage,
      setBrokerage,
    } = this.props;
    return (
      <div className="w-full lg:w-[31%]  flex flex-col h-full px-10 pt-10 pb-10 rounded-xl bg-[#f6f8fb] mr-5">
        <h1 className="font-[lato] font-semibold text-3xl mb-3">
          {tools[selectedTool]}
        </h1>
        <p className="font-[lato] text-gray-600 font-medium text-md mt-5 mb-2">
          {toolTipTexts[selectedTool]}
        </p>
        <motion.button
          whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
          onClick={() => setDrawerState(true)}
          whileTap={{ scale: 0.96, transition: 0.2 }}
          className=" mt-3 mb-10 text-left rounded-full font-semibold font-[lato] text-[17px] w-fit text-blue-600"
        >
          {"Read More"}
        </motion.button>
        <div className={"flex flex-row items-center gap-[5%]"}>
          <div className={"flex flex-col w-full "}>
            <h2 className="font-[lato] font-semibold text-lg ">Ticker Size</h2>
            <div className="flex flex-row bg-white rounded-lg border-2">
              <input
                type="number"
                name="ticker_id"
                value={tickerId}
                min={1}
                onChange={(e) =>
                  setTickerId(e.target.value ? e.target.value : tickerId)
                }
                className="w-1/2 px-3 font-[lato] font-semibold text-base py-3 rounded-lg"
              />
              <select
                onChange={(e) =>
                  setTickerMetric(
                    e.target.value ? e.target.value : tickerMetric,
                  )
                }
                className="w-1/2 cursor-pointer border-2 text-black outline-none py-1 px-1 rounded-lg my-1 mx-1 text-sm md:text-base font-[lato] font-semibold"
              >
                {tickerMetrics.map((val) => {
                  return (
                    <option value={val} className="bg-white py-2">
                      {val}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>

          <div className={"flex flex-col w-full "}>
            <h2 className="font-[lato] font-semibold text-lg">Duration</h2>
            <input
              type="number"
              name="duration"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value ? e.target.value : duration)
              }
              className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-lg border-2"
            />
          </div>
        </div>
        <div
          className={
            toolsMap[selectedTool] !== "DOUBLE_EVAL" &&
            toolsMap[selectedTool] !== "TRIPLE_EVAL"
              ? "hidden"
              : "flex flex-col w-full mt-5"
          }
        >
          <h2 className="font-[lato] font-semibold text-lg">
            {toolsMap[selectedTool] === "DOUBLE_EVAL"
              ? "Condition to be fixed"
              : "Pair of conditions to be fixed"}
          </h2>
          <div className="flex flex-row  gap-5">
            <div className="w-full ">
              <h2
                className={
                  toolsMap[selectedTool] === "TRIPLE_EVAL"
                    ? "font-[lato] mt-3 text-md"
                    : "hidden"
                }
              >
                Fix Condition 1
              </h2>
              <input
                type="number"
                name="duration"
                value={fixedCondition1}
                min={1}
                max={32}
                onChange={(e) =>
                  setFixedCondition1(
                    e.target.value ? e.target.value : fixedCondition1,
                  )
                }
                className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-lg border-2"
              />
            </div>
            <div
              className={
                toolsMap[selectedTool] === "TRIPLE_EVAL" ? "w-full" : "hidden"
              }
            >
              <h2 className={"font-[lato] mt-3 text-md"}>Fix Condition 2</h2>
              <input
                type="number"
                name="duration"
                value={fixedCondition2}
                min={1}
                max={32}
                onChange={(e) =>
                  setFixedCondition2(
                    e.target.value ? e.target.value : fixedCondition2,
                  )
                }
                className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-lg border-2"
              />
            </div>
          </div>
        </div>
        <h2 className="font-[lato] font-semibold text-lg mt-5">Conditions</h2>
        <Select
          isMulti
          options={conditions.map((val) => {
            return { label: val, value: val };
          })}
          onChange={(value) => setCondition(value)}
          className="w-full font-[lato] font-semibold text-base py-3"
        />
        {toolsMap[selectedTool] === "SINGLE_PRED" && (
          <h2 className={"font-[lato] font-semibold text-lg mt-5"}>
            What to Optimize{" "}
          </h2>
        )}
        {toolsMap[selectedTool] === "SINGLE_PRED" && (
          <Select
            options={metrics.map((val) => {
              return { label: val, value: val };
            })}
            value={whatToOptimize}
            onChange={(value) => setWhatToOptimize(value)}
            className="w-full font-[lato] font-semibold text-base py-3"
          />
        )}
        {toolsMap[selectedTool] === "BACK_TEST" && (
          <h2 className="font-[lato] font-semibold text-lg mt-5">Stop Loss</h2>
        )}
        {toolsMap[selectedTool] === "BACK_TEST" && (
          <input
            type={"number"}
            min={0}
            value={stoploss}
            onChange={(e) =>
              setStoploss(e.target.value ? e.target.value : stoploss)
            }
            className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-lg border-2"
          />
        )}
        {toolsMap[selectedTool] === "BACK_TEST" && (
          <h2 className="font-[lato] font-semibold text-lg mt-5">Brokerage</h2>
        )}
        {toolsMap[selectedTool] === "BACK_TEST" && (
          <input
            type={"number"}
            min={0}
            value={brokerage}
            onChange={(e) =>
              setBrokerage(e.target.value ? e.target.value : stoploss)
            }
            className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-lg border-2"
          />
        )}
        <h2 className="font-[lato] font-semibold text-lg mt-5">Stocks</h2>


        {toolsMap[selectedTool] !== "BACK_TEST" &&
          toolsMap[selectedTool] !== "SINGLE_PRED" && (
            <StockSelect tickers={stocks} setTickers={setTickers} />
          )}
        {(toolsMap[selectedTool] === "BACK_TEST" ||
          toolsMap[selectedTool] === "SINGLE_PRED") && (
          <Select
            options={stocks}
            value={singleStock}
            onChange={(value) => setSingleStock(value)}
            className="w-full font-[lato] font-semibold text-base py-3"
          />
        )}

        <motion.button
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
          onClick={() =>
            handleSubmit(
              singleReq,
              doubleReq,
              tripleReq,
              singlePredictorReq,
              backTestReq,
              setSingleResponse,
              setDoubleResponse,
              setTripleResponse,
              setSinglePredictorResponse,
              setBackTestResponse,
              setHistory,
              selectedTool,
            )
          }
          className="font-[lato] font-semibold text-white text-lg bg-blue-600 py-3 my-3 px-10 w-auto rounded-xl"
        >
          Submit
        </motion.button>
      </div>
    );
  }
}

StaticInput.propTypes = {
  setTickerId: PropTypes.any,
  setTickers: PropTypes.any,
  setCondition: PropTypes.any,
  setDuration: PropTypes.any,
  setSingleResponse: PropTypes.any,
  setDoubleResponse: PropTypes.any,
  setTripleResponse: PropTypes.any,
  setHistory: PropTypes.any,
  singleReq: PropTypes.any,
  DoubleReq: PropTypes.any,
  TripleReq: PropTypes.any,
};

export default StaticInput;
