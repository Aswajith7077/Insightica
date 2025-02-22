import React, {useState, useMemo, useCallback, useEffect} from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import Config from "/config/config";
import { tickers, metrics, metricsMemo, AllConditions } from "@/constants";

const fetchChartData = async (serverUrl, leaderboardUrl, stock, metric, setSeries, setResponseKeys, setLoading) => {
  try {
    setLoading(true);
    const response = await axios.get(`${serverUrl}${leaderboardUrl}`, {
      params: {
        ticker_symbol: stock,
        history: 0,
        metric_name: metricsMemo[metric],
      },
    });

    const result = response.data.slice(0, 5).map(value => value[metricsMemo[metric]]);
    const keys = response.data.slice(0, 5).map(value => value['condition']);

    setResponseKeys(keys.length ? keys : ["A", "B", "C"]);
    setSeries(result.length ? result : [1, 1, 1]);

  } catch (error) {
    console.error("Error fetching chart data:", error);
  } finally {
    setLoading(false);
  }
};

const PieChartAuxilary = ({ series, labels, loading }) => {
  const chartOptions = useMemo(() => ({
    chart: { type: "donut", toolbar: { show: false } },
    dataLabels: { enabled: false },
    colors: ["#eca1b9", "#e46955", "#008bce", "#fece35", "#2bbe93"],
    labels: labels.length ? labels : ["A", "B", "C"],
    legend: { position: "bottom" }
  }), [labels]);

  if (loading) return <div className="text-center font-semibold">Loading...</div>;

  return <ReactApexChart options={chartOptions} series={series} type="donut" width={380} height={275} />;
};

const PieChart = ({ leaderboardUrl }) => {
  const [stock, setStock] = useState(tickers[0]);
  const [metric, setMetric] = useState(metrics[0]);
  const [series, setSeries] = useState([1, 1, 1]);
  const [responseKeys, setResponseKeys] = useState(["A", "B", "C"]);
  const [loading, setLoading] = useState(false);

  const serverUrl = Config.serverUrl;

  const handleFetch = useCallback(() => {
    fetchChartData(serverUrl, leaderboardUrl, stock, metric, setSeries, setResponseKeys, setLoading);
    console.log(responseKeys);
    console.log(series);
  }, [serverUrl, leaderboardUrl, stock, metric]);

  useEffect(() => {
    fetchChartData(serverUrl, leaderboardUrl, stock, metric, setSeries, setResponseKeys);
  },[])

  return (
      <div className="flex flex-col gap-5 bg-white rounded-xl h-full w-full ">
        <h2 className="font-[lato] font-semibold text-xl">Leaderboard Chart</h2>

        <PieChartAuxilary series={series} labels={responseKeys} loading={loading} />

        <div className="flex flex-row gap-5">
          <select value={stock} onChange={(e) => setStock(e.target.value)} className="w-full cursor-pointer py-3 px-3 border-2 rounded-lg">
            {tickers.slice(0, 6).map((val) => (
                <option key={val} value={val}>{val}</option>
            ))}
          </select>

          <select value={metric} onChange={(e) => setMetric(e.target.value)} className="w-full cursor-pointer px-3 border-2 rounded-lg">
            {metrics.map((val) => (
                <option key={val} value={val}>{val}</option>
            ))}
          </select>
        </div>

        <Select
            isMulti
            options={AllConditions.map(val => ({ label: val, value: val }))}
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

export default PieChart;
