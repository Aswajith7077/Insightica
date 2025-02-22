import React from "react";
import ReactApexChart from "react-apexcharts";

const data = [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2];

const getOptions = (size) => {
  return {
    chart: {
      height: 350,
      type: "bar",
      toolbar: {
        show: false
      }
    },
    plotOptions: {
      bar: {
        borderRadius: 2,
        dataLabels: {
          position: "top" // top, center, bottom
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
        colors: ["#FFFFFF"], // Text color
        fontSize: "14px", // Custom font size
        fontFamily: "Lato, sans-serif", // Custom font family
        fontWeight: "bold" // Optional: Change font weight
      },
      dropShadow: {
        enabled: false // Disable shadows on the text
      }
    },
    theme: {
      fontFamily: "Lato, sans-serif" // Global custom font family
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec"
      ].slice(0, size),
      position: "bottom",
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
    // grid: {
    //   padding: {
    //     bottom: 0 // Removes the extra padding at the bottom of the chart
    //   }
    // },

    // legend: {
    //   horizontalAlign: "left"

    // },

    yaxis: {
      axisBorder: {
        show: true
      },
      axisTicks: {
        show: true
      },
      labels: {
        show: true,
        formatter: function (val) {
          return val + "%"; // TODO: Write an API for the number of users and get the API. Finally use the API data
        }
      }
    }
  };
};


const BarChart = ({ dataNumber }) => {
  // const [state, setState] = useState();

  return (
    <div className="flex flex-col bg-white border rounded-2xl shadow-sm w-full px-4 pt-10 pb-2 -z-0">
      {/* <div id="w-full"> */}
      <h1 className="font-[lato] text-2xl font-semibold mx-6 mb-4 ">
        Active Users
      </h1>
      <div className="hidden md:block">
        <ReactApexChart
          options={getOptions(data.length)}
          series={[
            {
              name: "User Activites",
              data: data.slice(0, data.length)
            }
          ]}
          type="bar"
          height={200}
        />
      </div>
      <div className="block md:hidden">
        <ReactApexChart
          options={getOptions(5)}
          series={[
            {
              name: "User Activites",
              data: data.slice(0, 5)
            }
          ]}
          type="bar"
          height={200}
        />
      </div>
      {/* </div> */}
    </div>
  );
};

export default BarChart;
