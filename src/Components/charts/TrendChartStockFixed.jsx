import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { metrics, metricsMemo } from "@/constants";
import Select from "react-select";

const normalizeData = (x) => {
  const min = Math.min(...x) ?? -0.5;
  const max = Math.max(...x) ?? 0.5;
  return x.map((value) => (value - min) / (max - min));
};


const historyValues = (hist) => {
  console.log(hist);
  let temp = [];
  for(var i = 0; i < hist; i++)
    temp.push(`${i + 1}`);
  return temp;
}

const TrendChartStockFixed = ({ history, data, tickers, conditions }) => {
  if (!data || conditions === undefined || tickers === undefined) return null;

  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [selectedStocks, setSelectedStocks] = useState(
      tickers.map((ticker) => ({ label: ticker, value: ticker }))
  );
  const [xValues, setXValues] = useState([]);

  // console.log('Data : ',data);
  useEffect(() => {
    if (!selectedStocks.length) return;
    console.log(data)
    let temp = selectedStocks.map((stock) =>
        Object.keys(data).map((value) => {
            console.log(data[value])
              return data[value][selectedCondition][stock.label][metricsMemo[selectedMetric]]
            }
        )
    );

    setXValues(temp.map((arr) => arr));
  }, [selectedCondition, selectedMetric, selectedStocks, data]);

  const [chartOptions, setChartOptions] = useState({
    chart: {
      height: 650,
      type: "area",
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        dataLabels: { position: "bottom" },
      },
    },
    dataLabels: {
      enabled: false,
      style: {
        colors: ["#FFFFFF"],
        fontSize: "14px",
        fontFamily: "Lato, sans-serif",
        fontWeight: "bold",
      },
      dropShadow: { enabled: false },
    },
    xaxis: {
      categories: historyValues(history), // Ensure all selected stocks are displayed
      position: "top",
      labels: {
        rotate: -45,
        style: { fontSize: "12px", fontWeight: "bold", colors: "#333" },
      },
      title: {
        text: "Days", // Replace with your desired x-axis label
        style: {
          fontSize: "16px",
          fontWeight: 600,
        },
      },
      axisBorder: { show: true, color: "#ccc" },
      axisTicks: { show: true, color: "#ccc" },
    },
    theme: {
      fontFamily: "Lato",
      fontSize: "14px",
    },
    yaxis: {
      labels: {
        formatter: (val) => val + "%",
      },

    },
  });

  return (
      <div>
        <div className="flex flex-col md:flex-row gap-5 my-10 mx-[5%]">
          <div className="w-full flex flex-col">
            <h2 className="font-semibold font-[lato] text-lg my-3">
              Stock Selector
            </h2>
            <Select
                isMulti
                options={Object.keys(data[Object.keys(data)[0]][Object.keys(data[Object.keys(data)[0]])[0]]).map((value) => ({ label: value, value: value }))}
                defaultValue={selectedStocks}
                onChange={(value) => setSelectedStocks(value || selectedStocks)}
                className="w-full bg-white font-[lato] font-semibold text-md"
            />
          </div>
          <div className="w-full flex flex-col">
            <h2 className="font-semibold font-[lato] text-lg my-3">
              Metric Selector
            </h2>
            <Select
                options={metrics.map((val) => ({ label: val, value: val }))}
                defaultValue={selectedMetric}
                onChange={(value) => setSelectedMetric(value.label || selectedMetric)}
                className="w-full bg-white font-[lato] font-semibold text-md"
            />
          </div>
          <div className="w-full flex flex-col">
            <h2 className="font-semibold font-[lato] text-lg my-3">
              Condition Selector
            </h2>
            <Select
                options={conditions.map((val) => ({ label: val, value: val }))}
                defaultValue={selectedCondition}
                onChange={(value) => setSelectedCondition(value.label || selectedCondition)}
                className="w-full bg-white font-[lato] font-semibold text-md"
            />
          </div>
        </div>
        <div
            id="chart"
            className="mx-[5%] mb-[5%] p-10 bg-white rounded-3xl shadow-lg border-2 border-[#dce1e7]"
        >
          <ReactApexChart
              options={chartOptions}
              series={selectedStocks.map((stock, idx) => ({
                name: stock.label,
                data: xValues[idx] || [],
              }))}
              type="area"
              height={450}
          />
        </div>
      </div>
  );
};

export default TrendChartStockFixed;
