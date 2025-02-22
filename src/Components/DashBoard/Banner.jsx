import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-scroll";
import { Link as Lk } from "react-router-dom";
import {globeConfig, sampleArcs} from "@/constants/Globe.js";

const World = React.lazy(() =>
  import("./../ui/globe").then((m) => ({ default: m.World }))
);

const title =
  "Have a clear Decision about your trades with our AI and ML based toolkit";

const slogan =
  "AI and ML based method to assign weights to trading conditions across diverse financial sectors like Equities, Futures, Options, Bonds, and Cryptocurrencies.";

const Banner = () => {
  return (
    <div className="flex justify-between flex-row py-[4%]  lg:pt-[3%] text-white px-[10%] bg-[#182433] z-20" id="banner">
      <div className="mt-[3%] lg:w-1/2">
        <h1 className="font-[montserrat] leading-normal text-center lg:text-left font-semibold text-4xl  mb-10">
          {title}
        </h1>
        <p className="text-center lg:text-left font-[lato] font-semibold text-md">{slogan}</p>
        <div className="flex flex-row gap-5 justify-center lg:justify-start">
          <Link to="tools" smooth={true}>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-[lato] my-10 font-semibold text-md  py-3 rounded-[15px] px-10 bg-blue-700 border-2 border-blue-700"
            >
              Get Started
            </motion.button>
          </Link>
          <Lk to="/docs">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="font-[lato] my-10 font-semibold text-md  py-3 rounded-[15px] px-10 border-2"
            >
              Documentation
            </motion.button>
          </Lk>
        </div>
      </div>
      <div className={'hidden lg:flex flex-row justify-center w-1/2 items-center'}>
        <div className="flex flex-row h-full w-[60%] items-center ">
          <World data={sampleArcs} globeConfig={globeConfig} className="h-10 w-10" />
        </div>
      </div>
    </div>
  );
};

export default Banner;

