import React, { useEffect } from "react";
import {
  AllConditions,
  metrics,
  metricsIndexMemo,
  tickers,
} from "@/constants/index.js";
import Config from "/config/config";
import axios from "axios";
import Select from "react-select";
// import ReactApexChart from "react-apexcharts";
import {Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.jsx";

const handleRequest = async (
  serverUrl,
  BackTestUrl,
  request,
  setSeries,
  setResponseKeys,
) => {
  try {
    const response = await axios.post(`${serverUrl}${BackTestUrl}`, request);
    // console.log(Object.keys(response.data.result));
    // console.log(response.data);
    setResponseKeys(
      response.data ? Object.keys(response.data.result) : ["1", "2", "3"],
    );
    setSeries(response.data ? Object.values(response.data.result) : []);
  } catch (error) {
    console.error("Error in handleRequest:", error);
  }
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
  // labels: [1, 2, 3, 4, 5].map((value) => `Condition ${value}`),
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
};

const BackTestLeaderBoard = () => {
  const [stock, setStock] = React.useState("^NSEI");

  const stocks = React.useMemo(() => tickers.sort().slice(0, 6), []); // Memoize to prevent re-renders
  const serverUrl = Config.serverUrl;
  const backTestUrl = Config.backTestUrl;
  const [condition, setCondition] = React.useState('2');
  const [series, setSeries] = React.useState([0, 0, 0, 0]);
  const [stoploss, setStoploss] = React.useState(0);
  const [brokerage, setBrokerage] = React.useState(0);

  const [responseKeys, setResponseKeys] = React.useState(["1", "2", "3"]);

  useEffect(() => {
    console.log(condition, stock, stoploss, brokerage);
    console.log(typeof condition);

    const fetchData = async () => {
      const request = {
        stock_name: stock,
        condition_indices: [condition],
        ticker_size: "1d",
        duration: 100,
        stoploss: stoploss,
        brokerage: brokerage,
      };
		console.log(request)

      await handleRequest(
        serverUrl,
        backTestUrl,
        request,
        setSeries,
        setResponseKeys,
      );
		console.log(series);
    };

    console.log("Series : ", series);

    fetchData();
  }, [stock, condition]); // Removed `stocks`

  return (
    <div className="flex flex-col gap-5 bg-white rounded-xl border w-full lg:w-1/2 px-10 py-5 my-10">
      <h2 className={"font-[lato] font-semibold text-xl"}>{"Back Test"}</h2>
      {
		  <Table>
			  <TableCaption>
				  Predicted values based on input conditions.
			  </TableCaption>
			  <TableHeader>
				  <TableRow>
					  <TableHead className="w-full">Values</TableHead>
					  <TableHead className="text-right">Values</TableHead>
				  </TableRow>
			  </TableHeader>
			  <TableBody>
				  {series.map((value,key) => (
					  <TableRow key={key}>
						  <TableCell className="font-medium">
							  {metrics[key]}
						  </TableCell>
						  <TableCell className="text-right">
							  {value.toFixed(2)}
						  </TableCell>
					  </TableRow>
				  ))}
			  </TableBody>
		  </Table>
      }
      <div className={"flex flex-row gap-5"}>
        <select
          onChange={(e) => setStock(e.target.value)}
          className="w-full cursor-pointer text-gray-500 outline-none py-3 px-3 border-2 rounded-lg font-[lato] text-sm md:text-base font-semibold appearance-none"
        >
          {stocks.map((val, key) => (
            <option value={val} key={key} className="bg-white py-2">
              {val}
            </option>
          ))}
        </select>
        <Select
          value={{label:condition,value:condition}}
          options={AllConditions.map((val) => ({ label: val, value: val }))}
          onChange={(selected) => {
			  console.log(typeof selected.label);
			  setCondition(selected.label);
			  console.log('condition : ',condition)
		  }}
          className="w-full font-[lato] font-semibold text-base "
        />
      </div>
      <div className={"hidden flex-row gap-5"}>
        <input
          type={"number"}
          placeholder={"Stop Loss"}
          className={
            "w-full cursor-pointer text-gray-500 outline-none py-3 px-3 border-2 rounded-lg font-[lato] text-sm md:text-base font-semibold appearance-none"
          }
        />
		  <input
			  type={"number"}
			  placeholder={"Stop Loss"}
			  className={
				  "w-full cursor-pointer text-gray-500 outline-none py-3 px-3 border-2 rounded-lg font-[lato] text-sm md:text-base font-semibold appearance-none"
			  }
		  />
	  </div>
	</div>
  );
};
export default BackTestLeaderBoard;
