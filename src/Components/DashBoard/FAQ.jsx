import React from "react";
import { motion } from "framer-motion";
import Accordion from "@/components/dashboard/Accordion";
import {
  leftColumnFAQ,
  rightColumnFAQ,
  middleColumnFAQ,
} from '@/constants/FAQ.js'


const FAQ = ({ className, id }) => {
  return (
    <div className={` ${className} `} id={id}>
      <h1 className="font-[montserrat] font-semibold text-xl md:text-4xl text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-row md:w-full justify-center mt-5 mb-10 text-md md:text-lg">
        <p className="font-[montserrat] text-sm md:text-lg">
          Have more questions? Visit Our
        </p>
        <button className="mx-2 font-[montserrat] text-md md:text-lg text-blue-700 hover:text-blue-500 font-semibold hover:cursor-pointer">
          Get Help
        </button>
      </div>
      <div className="flex flex-col mx-[5%] lg:flex-row justify-center gap-10 ">
        <motion.div className="flex flex-col my-5 w-full">
          {leftColumnFAQ.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </motion.div>
        <motion.div className="flex flex-col my-5 w-full">
          {middleColumnFAQ.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </motion.div>
        <div className="flex flex-col my-5 w-full">
          {rightColumnFAQ.map((value, key) => (
            <Accordion key={key} value={value} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
