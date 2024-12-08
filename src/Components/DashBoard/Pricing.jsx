import React from "react";
import { motion } from "framer-motion";
import { IoCheckmarkDone } from "react-icons/io5";
import { description } from "../PieChartComponent";
import { useState } from "react";

const pricing_values = [
  {
    title: "Single Evaluator",
    description:
      "Only one condition variable and show the performance of the resultant pairs of conditions ",
    tools: [
      {
        title: "1 Variable Condition",
        description: ""
      },
      {
        title: "Heat Map Representation",
        description:
          "The columns of the heat map will represent the individual stocks, the rows will represent the conditions"
      },
      {
        title: "Radial Graph Representation",
        description:
          "The graph will display the data for 6 metrics using 6 coloured lines (one colour for each metric), and each spoke will represent a condition."
      },
      {
        title: "Bar Graph Representation (Stock Fixed)",
        description:
          "Time(history) is along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected conditions) "
      },
      {
        title: "Bar Graph Representation (Time Fixed)",
        description:
          "Stocks are along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected conditions) "
      }
    ]
  },
  {
    title: "Double Evaluator",
    description:
      "Fixing ONE condition using a drop-down, and keep the other condition variable and show the performance of the resultant PAIRS of conditions ",
    tools: [
      {
        title: "1 Fixed Condition + 1 Variable Condition",
        description: ""
      },
      {
        title: "Heat Map Representation",
        description:
          "The columns of the heat map will represent the individual stocks, the rows will represent the PAIR of conditions "
      },
      {
        title: "Radial Graph Representation",
        description:
          "The graph will display the data for 6 metrics using 6 coloured lines (one colour for each metric), and each spoke will represent a PAIR of conditions "
      },
      {
        title: "Bar Graph Representation (Stock Fixed)",
        description:
          "Time(history) is along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected PAIR of conditions)"
      },
      {
        title: "Bar Graph Representation (Time Fixed)",
        description:
          "Stocks are along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected PAIR of conditions)"
      },
      {
        title: "Chord Diagram",
        description:
          "Each arc on the circumference represents one condition.\nEach band between two arcs represents how well the PAIR of conditions perform according to the given metric for the given stock (indicated by the thickness of the band)"
      }
    ]
  },
  {
    title: "Triple Evaluator",
    description:
      "Fixing TWO condition using a drop-down, and keep the other condition variable and show the performance of the resultant TRIPLETS of conditions ",
    tools: [
      {
        title: "2 Fixed Condition + 1 Variable Condition",
        description: ""
      },
      {
        title: "Heat Map Representation",
        description:
          "The columns of the heat map will represent the individual stocks, the rows will represent the TRIPLET of conditions "
      },
      {
        title: "Radial Graph Representation",
        description:
          "The graph will display the data for 6 metrics using 6 coloured lines (one colour for each metric), and each spoke will represent a TRIPLET of conditions "
      },
      {
        title: "Bar Graph Representation (Stock Fixed)",
        description:
          "Time(history) is along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected TRIPLET of conditions)"
      },
      {
        title: "Bar Graph Representation (Time Fixed)",
        description:
          "Stocks are along the x-axis and the value along the y-axis is a given metric (evaluating performance of the selected TRIPLET of conditions)"
      },
      {
        title: "Chord Diagram",
        description:
          "Each arc on the circumference represents one condition.\nEach band between two arcs represents how well the TRIPLET of conditions perform according to the given metric for the given stock (indicated by the thickness of the band)"
      }
    ]
  }
];


const Points = ({content}) => {
  const [isCollapsed,setIsCollapsed] = useState(false);
  return (
    <div>
      <div className="flex flex-row font-[lato] font-semibold text-[17px] items-center my-2 gap-5">
        <IoCheckmarkDone size={28} />
        <motion.h1
          whileHover={{ y: -3, color: "#2563eb" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer"
        >
          {content.title}
        </motion.h1>
      </div>
      {isCollapsed && <motion.p initial={{y:-10}} whileInView={{y:0,transitionDuration:2}} className=" ml-[12%] text-justify my-4">{content.description}</motion.p>}
    </div>
  );
}

const Button = ({ text }) => {
  return (
    <motion.button
      whileHover={{ stroke: "#183f8c", shadow: "" }}
      whileTap={{ scale: 0.95 }}
      className="rounded-[15px] border-1 border-black bg-[#0d0e13] hover:border-blue-800 w-full py-4 my-10 font-[lato] font-bold text-md text-white"
    >
      {text}
    </motion.button>
  );
};

// #291ea3

const Card = ({ content }) => {
  return (
    <motion.div
      // whileHover={{scale:1.02}}
      className="rounded-[20px] w-[30rem] h-full my-[5%] bg-black border-1 px-[2%] py-10"
    >
      <h1 className="text-[lato] font-semibold text-3xl text-center">
        {content.title}
      </h1>
      <p className="text-center mt-10">{content.description}</p>
      <Button text="Try Now" />
      {content.tools.map((value,key)=>{
        return <Points content={value} key={key}/>
      })}
    </motion.div>
  );
};

const Pricing = ({id}) => {
  return (
    <div className="flex flex-col my-[10%]" id={id}>
      <h1 className="font-[montserrat] text-center font-semibold text-4xl">
        Meet our Latest Tools
      </h1>
      <div className="flex flex-row justify-center gap-10 mx-10">
        {pricing_values.map((value, key) => {
          return <Card key={key} content={value} />;
        })}
      </div>
    </div>
  );
};

export default Pricing;
