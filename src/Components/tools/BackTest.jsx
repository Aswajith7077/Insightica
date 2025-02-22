import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table.jsx";
import { metrics } from "@/constants/index.js";
import ReactApexChart from "react-apexcharts";
import React from "react";

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
  labels: metrics.map((value) => value),
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

const BackTest = ({ response }) => {
  console.log(response);

  return (
    <div className="w-full h-full bg-white rounded-xl p-5">
      <h2 className="mx-10 my-7 font-[lato] font-semibold text-lg">
        Back Test
      </h2>

      {response?.result ? (
        <div className="mx-20 flex flex-row ">
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
              {Object.entries(response.result).map(([metricIndex, value]) => (
                <TableRow key={metricIndex}>
                  <TableCell className="font-medium">
                    {metrics[metricIndex]}
                  </TableCell>
                  <TableCell className="text-right">
                    {value.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/*<div id="chart" className="flex w-full justify-center items-center">*/}
          {/*  <ReactApexChart*/}
          {/*    options={finalOptions}*/}
          {/*    series={*/}
          {/*      response && response.result*/}
          {/*        ? response.result*/}
          {/*        : [0, 0, 0,0,0,0]*/}
          {/*    }*/}
          {/*    type="donut"*/}
          {/*    width={380}*/}
          {/*    height={275}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
      ) : (
        <div className="w-full text-center py-10">No data found</div>
      )}
    </div>
  );
};
export default BackTest;
