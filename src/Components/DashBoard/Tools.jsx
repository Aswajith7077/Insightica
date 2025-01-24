import { Component, useEffect, useState } from "react";
import AreaChart from "@/components/charts/AreaChart";
import BarChart from "@/components/charts/BarChart";
import { tickers } from "@/constants/index.js";
import { motion } from "framer-motion";
import { scroller } from "react-scroll";

import { AllConditions } from "@/constants/index.js";
import { Tooltip } from "react-tooltip";
import StaticInput from "@/components/dashboard/StaticInput";

import {
  pairPerformanceAnalyzer,
  conditionalEvaluator,
  triadInsights
} from "@/constants/ToolTip";

import { FaCircleInfo } from "react-icons/fa6";

import SingleEvaluator from "@/components/dashboard/SingleEvaluator";
import DoubleEvaluator from "@/components/dashboard/DoubleEvaluator";
import TripleEvaluator from "@/components/dashboard/TripleEvaluator";
import * as PropTypes from "prop-types";
import Tutorials from "../tools/Tutorials";
import { useAuth } from "@/auth/AuthContext";

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

class Greet extends Component {
  render() {
    let { loggedUser, className } = this.props;
    return (
      <div
        className={`flex flex-col lg:flex-row w-full my-10 items-center lg:items-start  ${className}`}
      >
        <div className="flex flex-row items-baseline mt-10 lg:mx-5 w-2/5 text-white">
          <h1 className="text-3xl text-[#78b4ff] lg:mx-3 font-[lato]">
            Hello,
          </h1>
          <h1 className="text-4xl font-bold font-[lato]">{`${loggedUser}`}</h1>
        </div>
        <div className="flex flex-row gap-10 w-full mx-10">
          <BarChart />
          <AreaChart />
        </div>
      </div>
    );
  }
}

Greet.propTypes = {
  loggedUser: PropTypes.any,
  className: PropTypes.any
};

class Options extends Component {
  render() {
    let { option, onClick, className, toolTipText } = this.props;
    return (
      <motion.button
        className={`flex flex-row w-1/3 gap-3 items-center justify-center pt-7 pb-4 px-10 rounded-tl-3xl rounded-tr-3xl ${className}`}
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        onClick={onClick}
      >
        {option}
        <FaCircleInfo
          data-tooltip-id="tools-tooltip"
          data-tooltip-content={toolTipText}
          className={"outline-none"}
        />
      </motion.button>
    );
  }
}

Options.propTypes = {
  option: PropTypes.any,
  onClick: PropTypes.any,
  className: PropTypes.any,
  toolTipText: PropTypes.any
};

const Tools = () => {
  const auth = useAuth();
  const [selectedTool, setSelectedTool] = useState(0);
  const [visibility, setVisibility] = useState(false);

  const [selectedTickers, setTickers] = useState([]);
  const [selectedCondition, setCondition] = useState([]);
  const [tickerId, setTickerId] = useState(1);
  const [duration, setDuration] = useState(30);

  const [fixedCondition1, setFixedCondition1] = useState(1);
  const [fixedCondition2, setFixedCondition2] = useState(2);

  const [singleResponse, setSingleResponse] = useState(null);
  const [doubleResponse, setDoubleResponse] = useState(null);
  const [tripleResponse, setTripleResponse] = useState(null);

  const [drawerState, setDrawerState] = useState(false);

  const [conditions, setConditionList] = useState(AllConditions);

  const [history, setHistory] = useState(1);


  useEffect(() => {
    scroller.scrollTo("toolbanner", {
      duration: 800,
      delay: 0,
      smooth: "easeInOutQuart",
      offset: -100
    });
  }, []);

  const singleReq = {
    stock_names: selectedTickers,
    condition_ids: selectedCondition.map((value) => value.label),
    ticker_size: `${tickerId}d`,
    duration: duration
  };

  const [doubleReq, setDoubleReq] = useState({
    stock_names: selectedTickers,
    condition_ids:
      selectedCondition.length >= 1
        ? selectedCondition.map((value) => value.label)
        : null,
    ticker_size: `${tickerId}d`,
    duration: duration
  });

  const [tripleReq, setTripleReq] = useState({
    stock_names: selectedTickers,
    condition_ids:
      selectedCondition.length >= 2
        ? selectedCondition.map((value) => value.label)
        : null,
    ticker_size: `${tickerId}d`,
    duration: duration
  });


  useEffect(() => {
    if (selectedTool !== 1) return;

    setConditionList((prev) => {
      return prev.filter((value) => value !== fixedCondition1);
    });
  }, [fixedCondition1, selectedTool]);

  useEffect(() => {
    if (selectedTool === 0) {
      const result = AllConditions;
      result.sort((a, b) => a - b);
      setConditionList(result);
    } else if (selectedTool === 1) {
      const result = AllConditions.filter((value) => value !== fixedCondition1);
      result.sort((a, b) => a - b);
      setConditionList(result);
    } else if (selectedTool === 2) {
      const result = AllConditions.filter(
        (value) =>
          value !== fixedCondition1 &&
          value !== fixedCondition2 &&
          !(value in selectedCondition)
      );
      result.sort((a, b) => a - b);
      setConditionList(result);
    }
  }, [fixedCondition1, fixedCondition2, selectedTool]);

  useEffect(() => {
    setDoubleReq(() => ({
      stock_names: selectedTickers,
      condition_ids: [
        fixedCondition1,
        ...selectedCondition.map((value) => value.label)
      ],
      ticker_size: `${tickerId}d`,
      duration: duration
    }));
  }, [fixedCondition1, selectedCondition, selectedTickers, tickerId, duration]);

  useEffect(() => {
    setTripleReq(() => ({
      stock_names: selectedTickers,
      condition_ids: [
        fixedCondition1,
        fixedCondition2,
        ...selectedCondition.map((value) => value.label)
      ],
      ticker_size: `${tickerId}d`,
      duration: duration
    }));
  }, [
    fixedCondition1,
    fixedCondition2,
    selectedCondition,
    selectedTickers,
    tickerId,
    duration
  ]);

  return (
    <div className="pt-1 w-full bg-slate-700 " id="toolbanner">
      <Tutorials visible={drawerState} setVisible={setDrawerState} />
      <Greet loggedUser={auth.user.name} className=" " />
      <div className="bg-slate-700 ">
        <div className="flex flex-col items-center mt-10">
          <section className="flex flex-row justify-evenly w-full pt-5 text-white font-bold font-[lato] text-lg  ">
            {tools.map((value, key) => {
              return (
                <Options
                  key={key}
                  option={value}
                  onClick={() => setSelectedTool(key)}
                  className={`${key === selectedTool ? "bg-[#182433]" : ""}`}
                  toolTipText={toolTipTexts[key]}
                />
              );
            })}
            <Tooltip id="tools-tooltip" />
          </section>

          <div className="flex flex-col lg:flex-row w-full bg-[#182433] h-full py-10 pb-5 px-10">
            <StaticInput
              setDrawerState={setDrawerState}
              fixedCondition1={fixedCondition1}
              fixedCondition2={fixedCondition2}
              setFixedCondition1={setFixedCondition1}
              setFixedCondition2={setFixedCondition2}
              setCondition={setCondition}
              setTickerId={setTickerId}
              setTickers={setTickers}
              setDuration={setDuration}
              setSingleResponse={setSingleResponse}
              setDoubleResponse={setDoubleResponse}
              setTripleResponse={setTripleResponse}
              setHistory={setHistory}
              conditions={conditions}
              tickerId={tickerId}
              duration={duration}
              singleReq={singleReq}
              doubleReq={doubleReq}
              tripleReq={tripleReq}
              selectedTool={selectedTool}
            />
            <div className="flex flex-col min-h-full w-full lg:w-[70%] ml-5 ">
              {/* <div className="h-[20rem] w-full rounded-[30px] bg-white"></div> */}
              {/* <div className="flex flex-row h-full"> */}
              {selectedTool === 0 && (
                <SingleEvaluator
                  response={singleResponse}
                  selectedCondition={selectedCondition}
                  selectedTickers={selectedTickers}
                  history={history}
                />
              )}
              {selectedTool === 1 && (
                <DoubleEvaluator
                  response={doubleResponse}
                  selectedCondition={selectedCondition}
                  selectedTickers={selectedTickers}
                  fixedCondition={fixedCondition1}
                  history={history}
                />
              )}
              {selectedTool === 2 && (
                <TripleEvaluator
                  response={tripleResponse}
                  selectedCondition={selectedCondition}
                  selectedTickers={selectedTickers}
                  fixedCondition1={fixedCondition1}
                  fixedCondition2={fixedCondition2}
                  history={history}
                />
              )}
              {/* </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;

// What's the probability of you arriving late to this test? It should be zero! ☠️
