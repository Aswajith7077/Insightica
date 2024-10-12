import React from "react";
import {useState,useMemo} from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";

import { PieChartComponent } from "./PieChartComponent";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";


import { Label } from "./UI/Label";
import { Input } from "./UI/Input";
import { cn } from "./UI/Utils";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { ButtonStyle } from "@/Constants";
import Footer from "./Footer";



const jsonData = [
  {
    c1: "0.0",
    c2: "0.0",
    c3: "3.0",
    c10: "4.0",
    c13: "1.0",
    c16: "1.0",
    c18: "2.0",
    c19: "4.0",
    c20: "1.0",
    c21: "4.0",
    c22: "2.0",
    c23: "0.0",
    c25: "1.0",
    c26: "0.0",
    c27: "4.0",
    c29: "7.0",
    c30: "0.0",
    c31: "0.0",
    c32: "3.0",
    c33: "1.0",
    c34: "8.0",
    c35: "0.0",
    c36: "3.0",
    c37: "3.0",
    c38: "1.0",
    ticker_entry: "BHARTIARTL.NS_1",
  },
  {
    c1: "0.0",
    c2: "0.0",
    c3: "3.0",
    c10: "1.0",
    c13: "1.0",
    c16: "0.0",
    c18: "2.0",
    c19: "4.0",
    c20: "1.0",
    c21: "1.0",
    c22: "2.0",
    c23: "0.0",
    c25: "1.0",
    c26: "0.0",
    c27: "0.0",
    c29: "7.0",
    c30: "0.0",
    c31: "0.0",
    c32: "3.0",
    c33: "4.0",
    c34: "8.0",
    c35: "4.0",
    c36: "1.0",
    c37: "1.0",
    c38: "1.0",
    ticker_entry: "ITC.NS_1",
  },
  {
    c1: "0.0",
    c2: "0.0",
    c3: "1.0",
    c10: "5.0",
    c13: "1.0",
    c16: "1.0",
    c18: "2.0",
    c19: "1.0",
    c20: "3.0",
    c21: "0.0",
    c22: "2.0",
    c23: "0.0",
    c25: "1.0",
    c26: "0.0",
    c27: "0.0",
    c29: "0.0",
    c30: "0.0",
    c31: "0.0",
    c32: "3.0",
    c33: "4.0",
    c34: "3.0",
    c35: "0.0",
    c36: "5.0",
    c37: "5.0",
    c38: "4.0",
    ticker_entry: "RELIANCE.NS_1",
  },
  {
    c1: "0.0",
    c2: "0.0",
    c3: "3.0",
    c10: "1.0",
    c13: "1.0",
    c16: "1.0",
    c18: "2.0",
    c19: "4.0",
    c20: "1.0",
    c21: "4.0",
    c22: "2.0",
    c23: "0.0",
    c25: "1.0",
    c26: "0.0",
    c27: "0.0",
    c29: "7.0",
    c30: "0.0",
    c31: "5.0",
    c32: "3.0",
    c33: "1.0",
    c34: "8.0",
    c35: "0.0",
    c36: "5.0",
    c37: "5.0",
    c38: "4.0",
    ticker_entry: "WIPRO.NS_1",
  },
];

const durations = [
  '5 - days','10 - days','15 - days','20 - days','25 - days'
];



const computeColumns = (json)=>{
  
  var columns = [];
  console.log(Object.entries(json[0]))
  for(const [key,value] of Object.entries(json[0]))
    columns.push({"key":key});
  
  return columns;
}

const handleSubmit = () =>{
  document
}


const Hero = () => {

  const columns = computeColumns(jsonData);

  const classes = [
    'BHARTIARTL.NS',
    'ITC.NS',
    'RELIANCE.NS',
    'WIPRO.NS',
  ]



  var count = 0;
  return (
    <div className="mx-[10%] ">
      <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 my-10">
        Trade Decision Optimizer
      </h2>
      <div className="w-[35%] flex flex-col ">
        <Select label="Duration " >
          {durations.map((duration, index) => (
            <SelectItem key={index}>{duration}</SelectItem>
          ))}
        </Select>
        <Autocomplete label="Choose" className="my-3">
          {classes.map((c, index) => (
            <AutocompleteItem key={index} value={c}>
              {c}
            </AutocompleteItem>
          ))}
          ;
        </Autocomplete>
        <Select label="What to Optimize " >
          {durations.map((duration, index) => (
            <SelectItem key={index}>{duration}</SelectItem>
          ))}
        </Select>
        <Select label="Conditions " className="my-3">
          {durations.map((duration, index) => (
            <SelectItem key={index}>{duration}</SelectItem>
          ))}
        </Select>
      </div>

      <button className={` my-4 ${ButtonStyle} w-[35%]`} onClick={handleSubmit}>
        Submit
      </button>


      <h1 className="text-3xl text-black dark:text-white my-7">Results</h1>

      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => <TableColumn key={column.key}>{column.key}</TableColumn>}
        </TableHeader>
        <TableBody items={jsonData}>
          {(item) => (
            <TableRow key={count}>
              {(columnKey) => {
                count++;
                return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {PieChartComponent()}
      {Footer}
    </div>
  );
}



export default Hero;


