import React from "react";
import { Button } from "@nextui-org/react";
import { ButtonStyle } from "./../Constants";
import { Link } from "react-router-dom";
import { TypewriterEffect } from "./UI/TyperWriter.jsx";
import { motion } from "framer-motion";

const Home = () => {
  const title =
    "Have a clear Decision about your trades with our AI and ML based toolkit";

  var w = title.split(" ");
  const result = w.map((value, index) => {
    return {
      text: `${value} `,
      className: `${index >= w.length - 5 ? "text-blue-500 dark:text-blue-600" : "text-black dark:text-white"} text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
    };
  });

  const words = [
    {
      text: "Build "
    },
    {
      text: "awesome "
    },
    {
      text: "apps "
    },
    {
      text: "with "
    },
    {
      text: "Aceternity. ",
      className: "text-blue-500 dark:text-blue-500"
    }
  ];

  const wordsArray = result.map((word) => {
    return {
      ...word,
      text: word.text.split("")
    };
  });

  const slogan =
    "AI and ML based method to assign weights to trading conditions across diverse financial sectors like Equities, Futures, Options, Bonds, and Cryptocurrencies.";

  return (
    <div className="flex flex-col h-full justify-center" id="home">
      <TypewriterEffect
        words={result}
        className={
          "mx-[15%] lg:mt-[15%] md:mt-[15%] mt-[30%] mb-[3%] text-black dark:text-white"
        }
      />
      <p
        className={
          "text-black dark:text-white my-4 text-center text-md w-[50%] mx-auto font-[lato] font-semibold"
        }
      >
        {slogan}
      </p>
      <Link to="/hero" className="flex justify-center my-5 m-auto w-cover ">
        <motion.button
          className={ButtonStyle}
          whileHover={{ scale: 1.1, transitionDuration: 0.2 }}
          whileTap={{scale:0.95,transitionDuration:0.1}}
          onHoverEnd={(e)=>{}}
          onHoverStart={(e)=>{}}
        >
          {" "}
          Get Started
        </motion.button>
      </Link>
    </div>
  );
};
export default Home;
