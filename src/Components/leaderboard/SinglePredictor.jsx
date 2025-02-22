import React, { useState, useEffect, useMemo, useCallback } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import Config from "/config/config";
import { AllConditions, tickers, metrics, metricsIndexMemo } from "@/constants/index.js";

const fetchChartData = async (serverUrl, singlePredictorUrl, request, setSeries, setResponseKeys, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.post(`${serverUrl}${singlePredictorUrl}`, request);
    const result = response.data?.result || {};

    const keys = Object.keys(result);
    const values = Object.values(result).map(v => (typeof v === "number" ? v : 1));

    setResponseKeys(keys); // ✅ No default values after API call
    setSeries(values);
  } catch (error) {
    console.error("Error fetching chart data:", error);
  } finally {
    setLoading(false);
  }
};

const PieChart = ({ series, labels, loading }) => {
  const hasData = Array.isArray(series) && series.length > 0 && Array.isArray(labels) && labels.length > 0;

  const chartOptions = useMemo(() => ({
    chart: { type: "donut", toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#eca1b9", "#e46955", "#008bce", "#fece35", "#2bbe93"],
    labels: hasData ? labels : ["A", "B", "C"], // ✅ Show dummy labels only initially
    legend: { position: "bottom" }
  }), [hasData, labels]);

  if (loading) return <div className="text-center font-semibold">Loading...</div>;

  return (
      <ReactApexChart options={chartOptions} series={hasData ? series : [1, 1, 1]} type="donut" width={380} height={275} />
  );
};

const SinglePredictorLeaderboard = () => {
  const [stock, setStock] = useState(tickers[0]);
  const [wto, setWto] = useState(0);
  const [condition, setCondition] = useState([1, 2, 3, 4]);
  const [series, setSeries] = useState([1, 1, 1]); // ✅ Dummy data initially
  const [responseKeys, setResponseKeys] = useState(["A", "B", "C"]); // ✅ Dummy labels initially
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false); // ✅ Tracks if API call has been made

  const serverUrl = Config.serverUrl;
  const singlePredictorUrl = Config.singlePredUrl;

  const handleFetch = useCallback(() => {
    const request = {
      stock_name: stock,
      condition_indices: condition,
      ticker_size: "1d",
      duration: 30,
      what_to_optimise: wto,
    };

    setSubmitted(true); // ✅ Mark that user has submitted
    fetchChartData(serverUrl, singlePredictorUrl, request, setSeries, setResponseKeys, setLoading);
  }, [stock, wto, condition, serverUrl, singlePredictorUrl]);

  return (
      <div className="flex flex-col gap-5 bg-white rounded-xl border w-full lg:w-1/2 px-10 py-5 my-10">
        <h2 className="font-[lato] font-semibold text-xl">Single Predictor</h2>

        <PieChart series={series} labels={responseKeys} loading={loading} />

        <div className="flex flex-row gap-5">
          <select onChange={(e) => setStock(e.target.value)} className="w-full cursor-pointer py-3 px-3 border-2 rounded-lg">
            {tickers.slice(0, 6).map((val, key) => (
                <option value={val} key={key}>{val}</option>
            ))}
          </select>

          <select onChange={(e) => setWto(metricsIndexMemo[e.target.value] ?? wto)} className="w-full cursor-pointer px-3 border-2 rounded-lg">
            {metrics.map((val, key) => (
                <option value={val} key={key}>{val}</option>
            ))}
          </select>
        </div>

        <Select
            isMulti
            options={AllConditions.map(val => ({ label: val, value: val }))}
            onChange={(selected) => setCondition(selected.map(item => item.value))}
            className="w-full"
        />

        <button
            onClick={handleFetch}
            className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition disabled:opacity-50"
            disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
  );
};

export default SinglePredictorLeaderboard;
