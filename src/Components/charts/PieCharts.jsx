import ReactApexChart from "react-apexcharts";
// import Select from "react-select";
import { metrics, metricsMemo, tickers } from "@/constants";
import { useEffect,useLayoutEffect, useState } from "react";
import axios from "axios";
import Config from "/config/config";

const Request = async (
  stock,
  metric,
  ToolNumber,
  setResult,
  serverUrl,
  leaderboardUrl
) => {
  // console.log(serverUrl + leaderboardUrl);
  if (ToolNumber !== 1) return;
  axios
    .get(serverUrl + leaderboardUrl, {
      params: {
        ticker_symbol: stock,
        history: 0,
        metric_name: metricsMemo[metric],
      },
    })
    .then((response) => {


      let result = [];

      response.data.slice(0, 5).map((value) => {
        // console.log('Response : ',value);
        result.push(value[metricsMemo[metric]]);
      });

      // console.log('Result: ', result);

      setResult((prev) => (result || result.length ? result : prev));


    })
    .catch((error) => {
      // console.log(error);
      setResult([]);
    });
};

const Auxilary = ({
  selectedMetric,
  setMetric,
  selectedHistory,
  setHistory,
  selectedStock,
  stocks,
  setStock,
}) => {
  return (
    <div className="flex flex-col w-full md:ml-10 lg:mx-10">
      <div className="flex flex-col w-full">
        <h2 className="font-[lato] font-semibold my-2">Metric</h2>
        <select
          onChange={(e) =>
            setMetric(e.target.value ? e.target.value : selectedMetric)
          }
          className=" cursor-pointer border-2 rounded-lg text-gray-500 outline-none py-3 px-3  text-sm md:text-base font-[lato] font-semibold appearance-none"
        >
          {metrics.map((val, key) => {
            return (
              <option value={val} key={key} className="bg-white py-2">
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
          className=" cursor-pointer text-gray-500 outline-none py-3 px-3 border-2 rounded-lg font-[lato] text-sm md:text-base font-semibold appearance-none"
        >
          {stocks.map((val, key) => {
            return (
              <option value={val} key={key} className="bg-white py-2">
                {val}
              </option>
            );
          })}
        </select>
      </div>
      {/*<div className="flex flex-col w-full">*/}
      {/*  <h2 className="font-[lato] font-semibold my-2">History</h2>*/}
      {/*  <input*/}
      {/*    type="number"*/}
      {/*    value={selectedHistory}*/}
      {/*    onChange={(e) =>*/}
      {/*      setHistory(e.target.value ? e.target.value : selectedHistory)*/}
      {/*    }*/}
      {/*    min={2020}*/}
      {/*    max={2024}*/}
      {/*    className="py-3 px-3 font-semibold font-[lato] text-sm md:text-base text-gray-500 border-2 rounded-lg "*/}
      {/*  />*/}
      {/*</div>*/}
    </div>
  );
};


const finalOptions = {
  chart: {
    width: 380,
    type: "donut",
    toolbar: {
      show: false,
    },
    dropShadow: {
      enabled: false, // Enable the shadow effect
      top: 10, // Vertical offset
      left: 0, // Horizontal offset
      // blur: 5, // Blur radius
      color: "#000000", // Shadow color
      opacity: 0.3, // Shadow opacity
    },
  },
  labels: [1,2,3,4,5].map(
      (value) => `Condition ${value}`
  ),
  dataLabels: {
    enabled: false,

    style: {
      colors: ["#FFFFFF"], // Text color
      fontSize: "14px", // Custom font size
      fontFamily: "Lato, sans-serif", // Custom font family
      fontWeight: "bold", // Optional: Change font weight
    },
    dropShadow: {
      enabled: false, // Disable shadows on the text
    },
  },
  colors: ["#eca1b9", "#e46955", "#008bce", "#fece35", "#2bbe93"], // Custom colors for slices
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
  legend: {
    position: "bottom",
  },
  theme: {
    fontFamily: "Lato, sans-serif", // Custom font family
    fontSize: "14px", // Global font size
  },
}

const PieChart = ({ elementNumber, leaderboardUrl }) => {
  const stocks = tickers.sort().slice(0, 6);
  const [selectedMetric, setMetric] = useState(metrics[0]);
  const [selectedStock, setStock] = useState(stocks[0]);
  const [selectedHistory, setHistory] = useState(3);

  const [result, setResult] = useState([]);

  const serverUrl = Config.serverUrl;


  useEffect(() => {
    try {
      Request(
        selectedStock,
        selectedMetric,
        elementNumber ? elementNumber : 0,
        setResult,
        serverUrl,
        leaderboardUrl
      );
    } catch (e) {
      console.log(e);
    }


    if (!result) setResult([]);


  }, [selectedMetric, selectedStock]);



  return (
  <div className="flex flex-col items-center md:flex-row lg:flex-col ">
    <div id="chart" className="">
      {result.length !== 0 && <ReactApexChart
          options={finalOptions}
          series={result}
          type="donut"
          width={380}
          height={275}
      />}
    </div>
    {<Auxilary
        stocks={stocks}
        selectedMetric={selectedMetric}
        setMetric={setMetric}
        selectedHistory={selectedHistory}
        setHistory={setHistory}
        selectedStock={selectedStock}
        setStock={setStock}
    />}

    <div id="html-dist"></div>
  </div>
);
};

export default PieChart;
