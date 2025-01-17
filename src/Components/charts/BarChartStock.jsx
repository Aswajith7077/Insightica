import { useState,useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { metrics,metricsMemo } from "@/constants";
import Select from "react-select";
// import { normalize } from "path";


const normalizeData = (x) => {

  const min = Math.min(...x) ?Math.min(...x): - 0.5;
  const max = min ? Math.max(...x) : Math.max(...x) + 0.5;

  const result = x.map(value => {
    return (value - min)/(max - min) ;
  });



  return result;
}

const BarChartStock = ({history,data,tickers,conditions}) => {
	if(!data || conditions === undefined || tickers === undefined)
		return;

	const [selectedCondition,setSelectedCondition] = useState(conditions[0]);
	const [selectedMetric,setSelectedMetric] = useState(metrics[0]);
	const [selectedStock,setSelectedStock] = useState({label:tickers[0],value:tickers[0]});
  const [xValues,setXValues] = useState([]);

	
	useEffect(() => {
      let temp = [];
      Object.keys(data).map((value,key)=>{
        temp.push(data[value][selectedCondition][selectedStock.label][metricsMemo[selectedMetric]])
      });
      const normalizedXValues = normalizeData(temp);
      setXValues(normalizedXValues);

  },[selectedCondition,selectedMetric,selectedStock]);


  


  const [state, setState] = useState({
    series: [
      {
        name: selectedMetric,
        data: xValues
      }
    ],
    options: {
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
            position: "bottom" // top, center, bottom
          }
        }
      },
      dataLabels: {
        enabled: false,
        formatter: function (val) {
          return val + "%";
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#2870c6"]
        }
      },

      xaxis: {
        categories: Object.keys(data).map((value, key) => ` Day - ${key + 1} `),
        position: "top",
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5
            }
          }
        },
        tooltip: {
          enabled: true
        }
      },
      yaxis: {
        axisBorder: {
          show: false
        },
        axisTicks: {
          show: false
        },
        labels: {
          show: true,
          formatter: function (val) {
            return val + "%";
          }
        }
      }
    }
  });

  return (
    <div>
      <div className="flex flex-col md:flex-row gap-5 my-10 mx-[5%]">
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg  my-3">
            Stock Selector
          </h2>
          <Select
            options={tickers.map(value => ({label:value,value : value}))}
            defaultValue={[selectedStock.label]}
            onChange={(value) =>
              setSelectedStock(
                value.label !== undefined ? value : selectedStock
              )
            }
            className="w-full bg-white font-[source sans 3] font-semibold text-md"
          />
        </div>
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg  my-3">
            Metric Selector
          </h2>
          <Select
            options={metrics.map((val) => ({ label: val, value: val }))}
            defaultValue={[selectedMetric]}
            onChange={(value) => {
              return setSelectedMetric(
                value !== undefined ? value.label : selectedMetric
              );
            }}
            className="w-full bg-white font-[source sans 3] font-semibold text-md"
          />
        </div>
        <div className="w-full flex flex-col">
          <h2 className="font-semibold font-[lato] text-lg  my-3">
            Condition Selector
          </h2>
          <Select
            options={conditions.map((val) => ({ label: val, value: val }))}
            defaultValue={[selectedCondition]}
            onChange={(value) => {
              return setSelectedCondition(
                value !== undefined ? value.label : selectedCondition
              );
            }}
            className="w-full bg-white font-[source sans 3] font-semibold text-md"
          />
        </div>
      </div>
      <div
        id="chart"
        className="mx-[5%] mb-[5%] p-10 bg-white rounded-3xl shadow-lg border-2 border-[#dce1e7]"
      >
        <ReactApexChart
          options={state.options}
          series={[
            {
              name: selectedMetric,
              data: xValues
            }
          ]}
          type="bar"
          height={450}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default BarChartStock;
