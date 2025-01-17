import { Component, useEffect, useState } from "react";
import { tickers } from "@/constants/index.js";
import { motion } from "framer-motion";
import Select from "react-select";
import axios from "axios";

import {
  pairPerformanceAnalyzer,
  conditionalEvaluator,
  triadInsights
} from "@/constants/ToolTip";

import * as PropTypes from "prop-types";
import StockSelect from "@/components/tools/StockSelect.jsx";

const tools = [
  "Condition Evaluator",
  "Pair Performance Analyzer",
  "Triad Insights"
];

const toolTipTexts = [
  conditionalEvaluator,
  pairPerformanceAnalyzer,
  triadInsights
];

const stocks = tickers.map((value) => {
  return {
    label: value,
    value: value
  };
});

const handleSubmit = (
  singleReq,
  doubleReq,
  tripleReq,
  setSingleResponse,
  setDoubleResponse,
  setTripleResponse,
  setHistory,
  selectedTool
) => {
  
  if (selectedTool === 0) {
    axios
      .post(
        "http://127.0.0.1:8000/api/tools/single_condition_analyzer/",
        singleReq
      )
      .then((res) => {
        setSingleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err.message));
  } else if (selectedTool === 1) {
    axios
      .post(
        "http://127.0.0.1:8000/api/tools/double_condition_analyzer/",
        doubleReq
      )
      .then((res) => {
        setDoubleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err));
  } else {
    axios
      .post(
        "http://127.0.0.1:8000/api/tools/triple_condition_analyzer/",
        tripleReq
      )
      .then((res) => {
        setTripleResponse(res.data);
        setHistory(Object.keys(res.data).length);
      })
      .catch((err) => alert(err));
  }
};

class StaticInput extends Component {
  render() {
    let {
      setDrawerState,
      fixedCondition1,
      fixedCondition2,
      conditions,
      setFixedCondition1,
      setFixedCondition2,
      singleReq,
      doubleReq,
      tripleReq,
      setTickerId,
      setTickers,
      setCondition,
      setDuration,
      setSingleResponse,
      setDoubleResponse,
      setTripleResponse,
      setHistory,
      tickerId,
      duration,
      selectedTool
    } = this.props;
    return (
      <div className="w-full lg:w-[31%]  flex flex-col h-full px-10 pt-10 pb-10 rounded-[30px] bg-[#f6f8fb] mr-5">
        <h1 className="font-[lato] font-semibold text-3xl mb-3">
          {tools[selectedTool]}
        </h1>
        <p className="font-[source sans 3] text-gray-600 font-medium text-md mt-5 mb-2">
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
            <input
              type="number"
              name="ticker_id"
              value={tickerId}
              min={1}
              onChange={(e) =>
                setTickerId(e.target.value ? e.target.value : tickerId)
              }
              className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-2xl border-2"
            />
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
              className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-2xl border-2"
            />
          </div>
        </div>
        <div
          className={
            selectedTool === 0 ? "hidden" : "flex flex-col w-full mt-5"
          }
        >
          <h2 className="font-[lato] font-semibold text-lg">
            {selectedTool === 1
              ? "Condition to be fixed"
              : "Pair of conditions to be fixed"}
          </h2>
          <div className="flex flex-row  gap-5">
            <div className="w-full ">
              <h2
                className={
                  selectedTool === 2
                    ? "font-[source sans 3] mt-3 text-md"
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
                    e.target.value ? e.target.value : fixedCondition1
                  )
                }
                className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-2xl border-2"
              />
            </div>
            <div className={selectedTool === 2 ? "w-full" : "hidden"}>
              <h2 className={"font-[source sans 3] mt-3 text-md"}>
                Fix Condition 2
              </h2>
              <input
                type="number"
                name="duration"
                value={fixedCondition2}
                min={1}
                max={32}
                onChange={(e) =>
                  setFixedCondition2(
                    e.target.value ? e.target.value : fixedCondition2
                  )
                }
                className="w-full px-3 font-[lato] font-semibold text-base py-3 rounded-2xl border-2"
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
        <h2 className="font-[lato] font-semibold text-lg mt-5">Stocks</h2>
        {/*<Select*/}
        {/*    isMulti*/}
        {/*    options={stocks}*/}
        {/*    onChange={value => setTickers(value)}*/}
        {/*    className="w-full font-[lato] font-semibold text-base py-3"*/}
        {/*/>*/}
        <StockSelect tickers={stocks} setTickers={setTickers} />
        <motion.button
          whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
          onClick={() =>
            handleSubmit(
              singleReq,
              doubleReq,
              tripleReq,
              setSingleResponse,
              setDoubleResponse,
              setTripleResponse,
              setHistory,
              selectedTool
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
  TripleReq: PropTypes.any
};

export default StaticInput;
