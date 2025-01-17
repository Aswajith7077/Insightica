import { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { metrics, metricsMemo } from "@/constants";
import Select from "react-select";

const normalizeData = (x) => {
  const min = Math.min(...x);
  const max = Math.max(...x);
  return x.map((value) => (value - min) / (max - min));
};

const BarChartTime = ({ history, data, tickers, conditions }) => {
  if (!data || !conditions || !tickers) {
    return <div>Data, tickers, or conditions are missing.</div>;
  }

  const [selectedCondition, setSelectedCondition] = useState(conditions[0]);
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]);
  const [selectedHistory, setSelectedHistory] = useState(1);
  const [normalizedXValues, setNormalizedXValues] = useState([]);

  useEffect(() => {
    let xValues = [];
    try {
      const historyData = data[`history_${selectedHistory}`];
      if (!historyData || !historyData[selectedCondition]) {
        console.error("Missing data for the selected history or condition.");
        return;
      }

      Object.keys(historyData[selectedCondition]).forEach((key) => {
        const metricValue =
          historyData[selectedCondition][key][metricsMemo[selectedMetric]];
        if (metricValue !== undefined) {
          xValues.push(metricValue);
        }
      });
    } catch (e) {
      console.error("Error processing data:", e.message);
      return;
    }

    setNormalizedXValues(normalizeData(xValues));
  }, [selectedCondition, selectedMetric, selectedHistory, data]);

  const options = {
    chart: {
      height: 650,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        dataLabels: {
          position: "bottom"
        }
      }
    },
    xaxis: {
      categories: data[`history_${selectedHistory}`]
        ? Object.keys(
            data[`history_${selectedHistory}`][selectedCondition] || {}
          ).map((_, index) => `Day - ${index + 1}`)
        : []
    },
    yaxis: {
      labels: {
        formatter: (val) => `${val}%`
      }
    }
  };

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 my-10 mx-[5%]">
        {/* History Selector */}
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg my-3">
            History Selector
          </h2>
          <input
            type="number"
            min={1}
            max={history}
            value={selectedHistory}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              if (value >= 1 && value <= history) {
                setSelectedHistory(value);
              }
            }}
            className="w-full border-2 rounded-2xl px-3 py-3 font-[lato]"
          />
        </div>

        {/* Metric Selector */}
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg my-3">
            Metric Selector
          </h2>
          <Select
            options={metrics.map((val) => ({ label: val, value: val }))}
            onChange={(value) =>
              setSelectedMetric(value ? value.label : selectedMetric)
            }
            className="w-full"
          />
        </div>

        {/* Condition Selector */}
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg my-3">
            Condition Selector
          </h2>
          <Select
            options={conditions.map((val) => ({ label: val, value: val }))}
            onChange={(value) =>
              setSelectedCondition(value ? value.label : selectedCondition)
            }
            className="w-full"
          />
        </div>
      </div>

      <div
        id="chart"
        className="mx-[5%] my-[5%] p-10 bg-white rounded-3xl shadow-lg border-2"
      >
        <ReactApexChart
          options={options}
          series={[
            {
              name: selectedMetric,
              data: normalizedXValues
            }
          ]}
          type="bar"
          height={450}
        />
      </div>
    </div>
  );
};

export default BarChartTime;
