import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { metrics, metricsMemo, tickers } from "@/constants";
import { useEffect, useState } from "react";
import axios from "axios";

const Request = ( stock, year, metric ,ToolNumber) => {

  if(ToolNumber !== 1)
    return;
  axios
    .get("http://127.0.0.1:8000/api/leaderboard/", {
      params: {
        ticker_symbol: stock,
        history: year,
        metric_name: metric
      }
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
};

const Auxilary = ({
  selectedMetric,
  setMetric,
  selectedHistory,
  setHistory,
  selectedStock,
  stocks,
  setStock
}) => {
  return (
    <div className="flex flex-col w-full md:ml-10 lg:mx-10">
      <div className="flex flex-col w-full">
        <h2 className="font-[lato] font-semibold my-2">Metric</h2>
        <select
          onChange={(e) =>
            setMetric(e.target.value ? e.target.value : selectedMetric)
          }
          className=" cursor-pointer text-base border text-gray-500 outline-none py-3 px-3 rounded-2xl font-[lato] font-semibold appearance-none"
        >
          {metrics.map((val) => {
            return (
              <option value={val} className="bg-white py-2">
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="font-[lato] font-semibold my-2">Stock</h2>
        <select
          onChange={(e) =>
            setStock(e.target.value ? e.target.value : selectedStock)
          }
          className=" cursor-pointer border text-gray-500 outline-none py-3 px-3 rounded-2xl font-[lato] font-semibold appearance-none"
        >
          {stocks.map((val) => {
            return (
              <option value={val} className="bg-white py-2">
                {val}
              </option>
            );
          })}
        </select>
      </div>
      <div className="flex flex-col w-full">
        <h2 className="font-[lato] font-semibold my-2">History</h2>
        <input
          type="number"
          value={selectedHistory}
          onChange={(e) =>
            setHistory(e.target.value ? e.target.value : selectedHistory)
          }
          min={2020}
          max={2024}
          className="py-3 px-3 font-semibold font-[lato] text-gray-500 border rounded-2xl"
        />
      </div>
    </div>
  );
};

const PieChart = ({ elementNumber }) => {
  const stocks = tickers.sort().slice(0,6);
  const [selectedMetric, setMetric] = useState(metrics[0]);
  const [selectedStock, setStock] = useState(stocks[0]);
  const [selectedHistory, setHistory] = useState(2020);

  const series = [44, 55, 13, 43, 22];
  const options = {
    chart: {
      width: 380,
      type: "pie",
      toolbar: {
        show: false
      },
      dropShadow: {
        enabled: false,
        top: 0,
        left: 0,
        blur: 3,
        opacity: 0.5
      }
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    dataLabels: {
      enabled: true,
      style: {
        colors: ["#FFFFFF"] // Optional: Set the text color explicitly
      },
      dropShadow: {
        enabled: false // Disable shadows on the text
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  useEffect(() => {
    Request(selectedStock,selectedHistory,selectedMetric,elementNumber ? elementNumber : 0);
  },[selectedHistory,selectedMetric,selectedStock])

  return (
    <div className="flex flex-col items-center md:flex-row lg:flex-col">
      <div id="chart" className="w-full">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={380}
        />
      </div>
      <Auxilary
        stocks={stocks}
        selectedMetric={selectedMetric}
        setMetric={setMetric}
        selectedHistory={selectedHistory}
        setHistory={setHistory}
        selectedStock={selectedStock}
        setStock={setStock}
      />

      {/* <Select
        options={metrics.map((val) => ({ label: val, value: val }))}
        onChange={(value) => {
          return setMetric(
            value !== undefined ? metricsMemo[value.label] : selectedMetric
          );
        }}
        className="bg-white font-[source sans 3] w-full font-semibold text-md"
      /> */}
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
