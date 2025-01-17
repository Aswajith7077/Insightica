import { useState } from "react";
import ReactApexChart from "react-apexcharts";
import Select from "react-select";
import { metrics, metricsMemo } from "@/constants";

const Radar = (x) => {
  const [selectedMetric, setMetric] = useState(metricsMemo[metrics[0]]);
  const [selectedHistory, setSelectedHistory] = useState(1);

  if (x.data === undefined || x.data === null || !x.data) return;

  const lister = x.data[Object.keys(x.data)[selectedHistory]];
  if(!lister)
      return;

  const currentTickers = x.tickers.map((value) => ({
    name: value,
    data: []
  }));

  const dictionary = currentTickers.reduce((acc, ticker) => {
    acc[ticker.name] = ticker;
    return acc;
  }, {});


  try {
    x.conditions.forEach((value) => {
      Object.keys(lister[value]).forEach((prop) => {
        dictionary[prop].data.push(lister[value][prop][selectedMetric]);
      });
    });
  } catch (e) {
    console.log("Error", e.message);
    return;
  }

  const radarOptions = {
    chart: {
      height: 350,
      type: "radar",
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1
      },
      toolbar: {
        show: false
      }
    },
    stroke: {
      width: 2
    },
    fill: {
      opacity: 0.1
    },
    markers: {
      size: 0
    },
    yaxis: {
      stepSize: 20
    },
    xaxis: {
      categories: Object.keys(lister)
    }
  };

  return (
    <div className="flex flex-col">
      <div className="mx-[5%]">
        <div className="flex flex-col md:flex-row gap-5 my-10">
          <div className="w-1/2 flex flex-col">
            <h2 className="font-semibold font-[lato] text-lg  my-3">
              History Selector
            </h2>
            <input
              type="number"
              min={1}
              value={selectedHistory}
              max={x.history - 1 ? x.history - 1 : x.history}
              onChange={(e) => {
                setSelectedHistory(
                  e.target.value !== undefined
                    ? e.target.value
                    : selectedHistory
                );
              }}
              className="w-full border-2 border-[#dce1e7] rounded-2xl outline-none px-3 py-3 font-[lato] font-semibold"
            />
          </div>
          <div className="flex flex-col w-1/2">
            <h2 className="font-semibold font-[lato] text-lg  my-3">
              Metric Selector
            </h2>
            <Select
              options={metrics.map((val) => ({ label: val, value: val }))}
              defaultValue={metrics[0]}
              onChange={(value) => {
                return setMetric(
                  value !== undefined
                    ? metricsMemo[value.label]
                    : selectedMetric
                );
              }}
              className="w-full bg-white font-[source sans 3] font-semibold text-md"
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col mx-[5%] ">
        <h2 className="font-semibold font-[lato] text-lg  my-3">
          Radar Chart
        </h2>
        <div
          id="heatmap"
          className="w-full my-5 p-10 bg-white border-2 border-[#dce1e7] rounded-3xl"
        >
          <ReactApexChart
            options={radarOptions}
            series={Object.values(dictionary)}
            type="radar"
            height={450}
          />
        </div>

        <div id="html-dist"></div>
      </div>

      <div id="html-dist"></div>
    </div>
  );
};

export default Radar;
