import React from "react";
import { motion } from "framer-motion";
import Accordion from "@/Components/DashBoard/Accordion";

const accordion_data = [
  {
    title: "What is Single Evaluator",
    content:
      "For single evaluator, we’ll have a total of 3 tools, represented by a heat map, radial graph and bar graph respectively. We’ll also interconnect these 3 tools with each other."
  },
  {
    title: "What is Double Evaluator"
  },
  {
    title: "What is Triple Evaluator"
  }
];

const FAQ = ({ className, id }) => {
  return (
    <div className={className} id={id}>
      <h1 className="font-[montserrat] font-semibold text-4xl text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-row justify-center my-10 text-lg">
        <p className="">Have more questions? Visit Our</p>
        <motion.a
          whileHover={{
            y: -7,
            color: ""
          }}
          className="mx-5 font-[lato] text-lg font-semibold hover:cursor-pointer"
        >
          Get Help
        </motion.a>
      </div>
      <div className="flex flex-row justify-center gap-[5%] ">
        <motion.div className="flex flex-col gap-3">
          {accordion_data.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </motion.div>
        <div className="flex flex-col gap-3">
          {accordion_data.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {accordion_data.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
