import React from "react";
import { useState, useMemo } from "react";
import { Select, SelectItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import axios from "axios";


import.meta.env.VITE_BASE_URL;

import { PieChartComponent } from "./PieChartComponent";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



import { ButtonStyle, tickers } from "@/Constants";
import Footer from "./Footer";

const durations = [
  "5 - days",
  "10 - days",
  "15 - days",
  "20 - days",
  "25 - days",
];

const jsonData1 = [
  {
    Sno: "1",
    Condition: "c1",
    Accuracy: "71.29387321841264",
  },
  {
    Sno: "2",
    Condition: "c1",
    Accuracy: "97.50000000000000",
  },
  {
    Sno: "3",
    Condition: "c3",
    Accuracy: "63.43875645235200",
  },
  {
    Sno: "4",
    Condition: "c5",
    Accuracy: "98.49382946321874",
  },
];

// const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('/data.json')
//       .then(response => setData(response.data))
//       .catch(error => console.error('Error fetching data:', error));
//   }, []);

const computeColumns = (json) => {
  var columns = [];
  console.log(Object.entries(json[0]));
  for (const [key, value] of Object.entries(json[0]))
    columns.push({ key: key });

  return columns;
};



var conditions = [];

const Hero = () => {
  const [isValidTicker, setValidTicker] = useState(false);
  const [isValidDuration, setValidDuration] = useState(false);
  const [isValidOptimizer,setValidOptimizer] = useState(false);
  const [isValidCondition,setValidCondition] = useState(false);
  const columns = computeColumns(jsonData1);

  var chosenTimeDuration, chosenTicker, chosenOptimizer;
  var chosenConditions = [];

  var count = 0;
  return (
    <div className="mt-[10%]">
      <div className="mx-[10%] ">
        <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 my-10">
          Trade Decision Optimizer
        </h2>
        <div className="lg:w-[45%] md:w-[50%] flex flex-col ">
          <Select
            label="Duration "
            className="font-[lato] text-bold text-[18px]"
            errorMessage={isValidDuration?"":"Please Select a valid time period"}
            isInvalid={isValidDuration}
            onChange={(e) => {
              chosenTimeDuration = durations[e.target.value];
              setValidDuration(
                chosenTimeDuration == null ||
                  chosenTimeDuration == undefined 
                  ? true
                  : false
              );
            }}
          >
            {durations.map((duration, index) => (
              <SelectItem key={index} className="font-[lato]">
                {duration}
              </SelectItem>
            ))}
          </Select>
          <Autocomplete
            label="Ticker"
            className="my-3"
            errorMessage={isValidTicker ? "" : "Please select a valid Ticker"}
            isInvalid={isValidTicker}
            onSelectionChange={(e) => {
              chosenTicker = tickers[e];
              setValidTicker(
                chosenTicker == null ||
                  chosenTicker == undefined
                  ? true
                  : false
              );
              console.log("value " + chosenTicker);
            }}
          >
            {tickers.map((c, index) => (
              <AutocompleteItem key={index} value={c}>
                {c}
              </AutocompleteItem>
            ))}
          </Autocomplete>
          <Select
            label="What to Optimize "
            errorMessage={isValidOptimizer ? "": "Please select a valid Optimizer"}
            isInvalid={isValidOptimizer}
            onChange={(e) => {
              chosenOptimizer = durations[e.target.value];
              setValidOptimizer(
                chosenOptimizer == null||
                chosenOptimizer == undefined
                ? true
                : false
              )
            }}
          >
            {durations.map((duration, index) => (
              <SelectItem key={index}>{duration}</SelectItem>
            ))}
          </Select>
          <Select
            label="Conditions "
            className="my-3"
            errorMessage={isValidCondition?"":"Please select Atleast one Condition"}
            isInvalid={isValidCondition}
            onChange={(e) => {
              let value = durations[e.target.value];
              if (!chosenConditions.includes(value) && value != null && value != undefined)
                chosenConditions.push(value);
            }}
          >
            {durations.map((duration, index) => (
              <SelectItem key={index}>{duration}</SelectItem>
            ))}
          </Select>
        </div>

        <button
          className={` my-4 ${ButtonStyle} w-full lg:w-[45%] md:w-[50%] h-[60px] rounded-[19px]`}
          onClick={()=>{
            if(chosenTimeDuration == null || chosenTimeDuration == undefined )
              setValidDuration(false);
            if(chosenTicker == null || chosenTicker == undefined)
              setValidTicker(false);
            if(chosenOptimizer == null || chosenOptimizer == undefined)
              setValidOptimizer(false);
            if(chosenConditions == null || chosenConditions.length == 0)
              setValidCondition(false);

            if(isValidDuration && isValidTicker && isValidOptimizer && isValidCondition){
              axios.post(VITE_BASE_URL,{
                "duration":chosenTimeDuration,
                "ticker":chosenTicker,
                "optimizer":chosenOptimizer,
                "conditions":chosenConditions
              }).then((res)=>{
                console.log(res);
              }).catch((err)=>{
                console.log(err);
              });
            }
          }}
        >
          Submit
        </button>

        <h1 className="text-3xl text-black dark:text-white my-7">Results</h1>

        <PieChartComponent className="h-[500px]"/>

        <Table className="my-[30%] lg:my-[10%] md:my-[10%]">
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[10%] text-right text-xl">Sno</TableHead>
              <TableHead className="w-[10%] text-right text-xl">
                Condition
              </TableHead>
              <TableHead className="w-[40%] text-right text-xl">
                Accuracy
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {jsonData1.map((value,key) => {
              return (
                <TableRow key={key}>
                  <TableCell className="font-medium font-[lato] text-[14px] md:text-[19px] lg:text-[19px] h-[60px] text-right">
                    {value.Sno}
                  </TableCell>
                  <TableCell className="font-[lato] text-[14px] md:text-[19px] lg:text-[19px] w-[20%] text-right">
                    {value.Condition}
                  </TableCell>
                  <TableCell className="font-[lato] text-[14px] md:text-[19px] lg:text-[19px] w-[40%] text-right">
                    {value.Accuracy}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Footer />
    </div>
  );
};

export default Hero;

