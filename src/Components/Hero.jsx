import React from "react";
import {useState,useMemo} from 'react';
import { Select, SelectItem } from "@nextui-org/react";
import { Autocomplete, AutocompleteItem,Progress } from "@nextui-org/react";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

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

// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
//   TableFooter
// } from "./UI/table";



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


console.log(jsonData);

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
  console.log('Columns : ' + columns);

  const classes = [
    'BHARTIARTL.NS',
    'ITC.NS',
    'RELIANCE.NS',
    'WIPRO.NS',
  ]
  const [value, setValue] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v + 10));
    }, 500);

    return () => clearInterval(interval);
  }, []);



  var count = 0;
  return (
    <div className="mx-[10%] ">
      <h2 className="font-bold text-3xl text-neutral-800 dark:text-neutral-200 my-10">
        Trade Decision Optimizer
      </h2>
      <div className="w-[35%] flex flex-col ">
        <Select label="Duration " className="max-w-xs">
          {durations.map((duration, index) => (
            <SelectItem key={index}>{duration}</SelectItem>
          ))}
        </Select>
        <Autocomplete label="Choose" className="max-w-xs my-3">
          {classes.map((c, index) => (
            <AutocompleteItem key={index} value={c}>
              {c}
            </AutocompleteItem>
          ))}
          ;
        </Autocomplete>
        <LabelInputContainer className={"my-2"}>
          <Label htmlFor="firstname">First name</Label>
          <Input id="firstname" placeholder="Tyler" type="text" />
        </LabelInputContainer>
        <LabelInputContainer className={"my-2"}>
          <Label htmlFor="Conditions">Condition</Label>
          <Input id="Condition" placeholder="Type a condition" type="text" />
        </LabelInputContainer>
      </div>

      <button className={` my-4 ${ButtonStyle} w-[35%]`} onClick={handleSubmit}>
        Submit
      </button>

      <Progress
        aria-label="Downloading..."
        size="md"
        value={value}
        showValueLabel={true}
        className="max-w-md "
      />

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

      {InteractiveBarChart()}
    </div>
  );
}



export default Hero;


const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({ children, className }) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};


const chartData = [
  { date: "2024-04-01", desktop: 222, mobile: 150 },
  { date: "2024-04-02", desktop: 97, mobile: 180 },
  { date: "2024-04-03", desktop: 167, mobile: 120 },
  { date: "2024-04-04", desktop: 242, mobile: 260 },
  { date: "2024-04-05", desktop: 373, mobile: 290 },
  { date: "2024-04-06", desktop: 301, mobile: 340 },
  { date: "2024-04-07", desktop: 245, mobile: 180 },
  { date: "2024-04-08", desktop: 409, mobile: 320 },
  { date: "2024-04-09", desktop: 59, mobile: 110 },
  { date: "2024-04-10", desktop: 261, mobile: 190 },
  { date: "2024-04-11", desktop: 327, mobile: 350 },
  { date: "2024-04-12", desktop: 292, mobile: 210 },
  { date: "2024-04-13", desktop: 342, mobile: 380 },
  { date: "2024-04-14", desktop: 137, mobile: 220 },
  { date: "2024-04-15", desktop: 120, mobile: 170 },
  { date: "2024-04-16", desktop: 138, mobile: 190 },
  { date: "2024-04-17", desktop: 446, mobile: 360 },
  { date: "2024-04-18", desktop: 364, mobile: 410 },
  { date: "2024-04-19", desktop: 243, mobile: 180 },
  { date: "2024-04-20", desktop: 89, mobile: 150 },
  { date: "2024-04-21", desktop: 137, mobile: 200 },
  { date: "2024-04-22", desktop: 224, mobile: 170 },
  { date: "2024-04-23", desktop: 138, mobile: 230 },
  { date: "2024-04-24", desktop: 387, mobile: 290 },
  { date: "2024-04-25", desktop: 215, mobile: 250 },
  { date: "2024-04-26", desktop: 75, mobile: 130 },
  { date: "2024-04-27", desktop: 383, mobile: 420 },
  { date: "2024-04-28", desktop: 122, mobile: 180 },
  { date: "2024-04-29", desktop: 315, mobile: 240 },
  { date: "2024-04-30", desktop: 454, mobile: 380 },
  { date: "2024-05-01", desktop: 165, mobile: 220 },
  { date: "2024-05-02", desktop: 293, mobile: 310 },
  { date: "2024-05-03", desktop: 247, mobile: 190 },
  { date: "2024-05-04", desktop: 385, mobile: 420 },
  { date: "2024-05-05", desktop: 481, mobile: 390 },
  { date: "2024-05-06", desktop: 498, mobile: 520 },
  { date: "2024-05-07", desktop: 388, mobile: 300 },
  { date: "2024-05-08", desktop: 149, mobile: 210 },
  { date: "2024-05-09", desktop: 227, mobile: 180 },
  { date: "2024-05-10", desktop: 293, mobile: 330 },
  { date: "2024-05-11", desktop: 335, mobile: 270 },
  { date: "2024-05-12", desktop: 197, mobile: 240 },
  { date: "2024-05-13", desktop: 197, mobile: 160 },
  { date: "2024-05-14", desktop: 448, mobile: 490 },
  { date: "2024-05-15", desktop: 473, mobile: 380 },
  { date: "2024-05-16", desktop: 338, mobile: 400 },
  { date: "2024-05-17", desktop: 499, mobile: 420 },
  { date: "2024-05-18", desktop: 315, mobile: 350 },
  { date: "2024-05-19", desktop: 235, mobile: 180 },
  { date: "2024-05-20", desktop: 177, mobile: 230 },
  { date: "2024-05-21", desktop: 82, mobile: 140 },
  { date: "2024-05-22", desktop: 81, mobile: 120 },
  { date: "2024-05-23", desktop: 252, mobile: 290 },
  { date: "2024-05-24", desktop: 294, mobile: 220 },
  { date: "2024-05-25", desktop: 201, mobile: 250 },
  { date: "2024-05-26", desktop: 213, mobile: 170 },
  { date: "2024-05-27", desktop: 420, mobile: 460 },
  { date: "2024-05-28", desktop: 233, mobile: 190 },
  { date: "2024-05-29", desktop: 78, mobile: 130 },
  { date: "2024-05-30", desktop: 340, mobile: 280 },
  { date: "2024-05-31", desktop: 178, mobile: 230 },
  { date: "2024-06-01", desktop: 178, mobile: 200 },
  { date: "2024-06-02", desktop: 470, mobile: 410 },
  { date: "2024-06-03", desktop: 103, mobile: 160 },
  { date: "2024-06-04", desktop: 439, mobile: 380 },
  { date: "2024-06-05", desktop: 88, mobile: 140 },
  { date: "2024-06-06", desktop: 294, mobile: 250 },
  { date: "2024-06-07", desktop: 323, mobile: 370 },
  { date: "2024-06-08", desktop: 385, mobile: 320 },
  { date: "2024-06-09", desktop: 438, mobile: 480 },
  { date: "2024-06-10", desktop: 155, mobile: 200 },
  { date: "2024-06-11", desktop: 92, mobile: 150 },
  { date: "2024-06-12", desktop: 492, mobile: 420 },
  { date: "2024-06-13", desktop: 81, mobile: 130 },
  { date: "2024-06-14", desktop: 426, mobile: 380 },
  { date: "2024-06-15", desktop: 307, mobile: 350 },
  { date: "2024-06-16", desktop: 371, mobile: 310 },
  { date: "2024-06-17", desktop: 475, mobile: 520 },
  { date: "2024-06-18", desktop: 107, mobile: 170 },
  { date: "2024-06-19", desktop: 341, mobile: 290 },
  { date: "2024-06-20", desktop: 408, mobile: 450 },
  { date: "2024-06-21", desktop: 169, mobile: 210 },
  { date: "2024-06-22", desktop: 317, mobile: 270 },
  { date: "2024-06-23", desktop: 480, mobile: 530 },
  { date: "2024-06-24", desktop: 132, mobile: 180 },
  { date: "2024-06-25", desktop: 141, mobile: 190 },
  { date: "2024-06-26", desktop: 434, mobile: 380 },
  { date: "2024-06-27", desktop: 448, mobile: 490 },
  { date: "2024-06-28", desktop: 149, mobile: 200 },
  { date: "2024-06-29", desktop: 103, mobile: 160 },
  { date: "2024-06-30", desktop: 446, mobile: 400 },
]

const chartConfig = {
  views: {
    label: "Page Views",
  },
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
}

const InteractiveBarChart = () => {
  const [activeChart, setActiveChart] =
    useState("desktop")

  const total = useMemo(
    () => ({
      desktop: chartData.reduce((acc, curr) => acc + curr.desktop, 0),
      mobile: chartData.reduce((acc, curr) => acc + curr.mobile, 0),
    }),
    []
  )

  return (
    <Card className='my-10'>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Bar Chart - Interactive</CardTitle>
          <CardDescription>
            Showing total visitors for the last 3 months
          </CardDescription>
        </div>
        <div className="flex">
          {["desktop", "mobile"].map((key) => {
            const chart = key;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value)
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill={`var(--color-${activeChart})`} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
