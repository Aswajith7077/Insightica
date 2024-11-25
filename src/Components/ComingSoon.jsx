import React, { Suspense } from "react";
import { globeConfig } from "@/Constants/index.js";
import { sampleArcs } from "@/Constants/index.js";
import { TypewriterEffect } from "./UI/TyperWriter.jsx";
import { FlipWords } from "./UI/flip-words.jsx";

import { AppName } from "@/Constants/index.js";

const World = React.lazy(() =>
  import("./ui/globe").then((m) => ({ default: m.World }))
);

var w = "Coming Soon".split(" ");

const words = [
	"Coming Soon",
	"Revolutionized toolkit",
]

const result = w.map((value, index) => {
  return {
    text: `${value} `,
    className: `text-blue-200 text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
  };
});



function ComingSoon() {
  return (
    <div className="relative flex flex-col justify-center h-screen overflow-hidden bg-gradient-to-br from-black to-gray-900 text-white font-sans p-4">
      <div className="flex flex-col mt-[30%] lg:mt-[5%] lg:flex-row w-full h-[150%]">
        <div className="flex justify-center w-full h-[100%] flex-col text-center z-20 ">
          <h1 className="w-auto text-left py-[3%] mx-[10%] text-5xl lg:text-7xl font-bold tracking-tight text-white font-[lato]">
            {AppName}
          </h1>
          {/* <TypewriterEffect words={result} className="text-left mx-[10%] mb-8"/> */}
          <h1 className="text-left mx-[10%] text-3xl text-bold ">
            <FlipWords words={words} className="text-blue-500" />
          </h1>

          <div className=" ml-[10%] mr-[5%] mt-[5%]">
            <p className="w-full text-lg text-justify leading-relaxed mb-4 font-[lato] font-light select-none">
              At Insightica, we&#39;re redefining market analysis with a
              dynamic, AI-powered platform that combines dozens of indicators,
              allowing you to gain deeper insights into market trends.
            </p>
            <p className="w-full text-lg text-justify leading-relaxed mb-4 font-[lato] font-light select-none">
              By analyzing vast amounts of historical data, our platform
              empowers traders to make informed, data-backed decisions
              confidently.
            </p>
            <p className="w-full text-lg text-justify leading-relaxed font-[lato] font-light select-none">
              Rooted in innovation, Insightica enhances your trading experience,
              helping you achieve better outcomes. Join us on this journey!
            </p>
          </div>
        </div>

        <div className="w-[100%] h-[100%] z-10 pt-5">
          <World data={sampleArcs} globeConfig={globeConfig} className="h-55" />
        </div>
      </div>
      <div className="flex justify-center w-full mt-[10%]">
        <p className="w-[100%] mx-2 mb-10 md:w-[40%] md:mx-0 md:mb-5 justify-center text-lg text-center font-[lato] font-semibold bg-clip-text text-transparent bg-gradient-to-b from-white to-blue-600"></p>
      </div>
    </div>
  );
}

export default ComingSoon;
