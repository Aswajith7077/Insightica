import React from "react";
import { motion } from "framer-motion";
import { sampleArcs, globeConfig } from "@/Constants";
import { Link } from "react-scroll";

const World = React.lazy(() =>
  import("./../UI/globe").then((m) => ({ default: m.World }))
);

const title =
  "Have a clear Decision about your trades with our AI and ML based toolkit";

const slogan =
  "AI and ML based method to assign weights to trading conditions across diverse financial sectors like Equities, Futures, Options, Bonds, and Cryptocurrencies.";

const Banner = () => {
  return (
    <div className="flex flex-row py-[4%] pt-[10%] text-white px-[10%] bg-[#182433]">
      <div className="mt-[2%]">
        <h1 className="font-[montserrat] leading-normal font-semibold text-4xl w-[45rem] mb-10">
          {title}
        </h1>
        <p className="w-[40rem] font-[lato] font-semibold text-md">{slogan}</p>
        <Link to="tools" smooth={true}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="font-[lato] my-10 font-semibold text-md  py-3 rounded-[15px] px-10 bg-blue-700"
          >
            Get Started
          </motion.button>
        </Link>
      </div>
      <div className="w-full ">
        <World data={sampleArcs} globeConfig={globeConfig} className="h-10" />
      </div>
    </div>
  );
};

export default Banner;

