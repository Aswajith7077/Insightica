import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { TopSection } from "@/constants/Tutorials";
import { SingleEvalHelp, DoubleEvalHelp,TripleEvalHelp } from "@/constants/ToolsHelp";
import { Link } from "react-scroll";
import { motion } from "framer-motion";

const tools = [
  "Condition Evaluator",
  "Pair Performance Analyzer",
  "Triad Insights"
];

const TopSectionRenderer = () => {
  return (
    <div className="mx-5 mb-[10%]">
      <p className="font-semibold font-[lato] text-lg my-10 text-gray-500 italic">
        {TopSection.Introduction}
      </p>
      <h2 className="font-semibold font-[lato] text-2xl my-10">
        Guide to Get Started
      </h2>
      <div className="flex flex-col">
        {TopSection.GetStarted.map((value,key) => {
          return (
            <div key={key}>
              <h3 className="font-semibold font-[lato] text-xl">
                {value.title}
              </h3>
              {value.description && (
                <p className="font-[lato] font-semibold text-lg text-gray-600 mx-5 my-10">
                  {value.description}
                </p>
              )}
              <ul className="flex flex-col gap-5 my-10">
                {value.points.map((val, k) => {
                  return <li key={k} className="mx-[10%] font-[lato] font-semibold text-lg text-gray-500">{val}</li>;
                })}
              </ul>
            </div>
          );
        })}
      </div>
      <ul>
        {TopSection.QuickLinks.map((value,key)=>{
          console.log('Link : ',value.link);
          return <li>
            <Link to={value.link} key={key} smooth={true  }>
              <motion.button whileTap={{scale:0.95,transition:{duration:0.2}}} whileHover={{y:-5,transition:{duration:0.2}}} className="font-[lato] font-semibold text-blue-500 text-lg my-3">
                {value.title}
              </motion.button>
            </Link>
          </li>
        })}
      </ul>
      

    </div>
  );
};

const ToolsTutorials = ({ drawerContent, selectedTool,id }) => {
  console.log('Id : ',id)
  return (
    <div className="flex flex-col w-full items-center" id={id}>
      <h1 className="font-[lato] font-semibold text-4xl my-10 mx-5">
        {tools[selectedTool]}
      </h1>
      <h2 className="font-[source sans 3] mx-5 mt-10 font-semibold text-2xl">
        {"What It Does"}
      </h2>
      <ul className="flex flex-col w-[35rem] mt-5 mb-9 mx-[10%] gap-5">
        {drawerContent.whatItDoes.map((value) => (
          <li className=" text-gray-600 text-justify font-[lato] font-semibold text-lg">
            {value}
          </li>
        ))}
      </ul>
      <h2 className="font-[source sans 3] mx-5 mt-10 font-semibold text-2xl">
        {"How to Use"}
      </h2>
      <ul className="flex flex-col w-[38rem] my-9 mx-5 gap-5">
        {drawerContent.howToUse.map((value, key) => (
          <div key={key} className="flex flex-row ">
            <p className="font-[lato] font-bold text-lg w-1/5">{`Step ${key + 1}:`}</p>
            <li
              key={key}
              className=" w-4/5 text-gray-600 text-justify font-[lato] font-semibold text-lg"
            >
              {value}
            </li>
          </div>
        ))}
      </ul>
      <h2 className="font-[source sans 3] mx-5 mt-10 font-semibold text-2xl">
        {"Key Visualizations"}
      </h2>
      <ul className="flex flex-col w-[40rem] my-5 items-center  gap-10">
        {drawerContent.keyVisualizations.map((value, key) => (
          <div key={key} className="flex w-full flex-col gap-5 mx-[20%]">
            <p className="font-[lato] font-bold text-lg w-1/3">{value.title}</p>
            <ul className="flex flex-col my-5 w-full  gap-2">
              {value.points.map((val, k) => {
                return (
                  <li
                    key={k}
                    className=" w-full text-gray-600 text-justify font-[lato] font-semibold text-lg"
                  >
                    {val}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </ul>
    </div>
  );
};

const Tutorials = ({ visible, setVisible }) => {
  return (
    <Drawer
      visible={visible}
      width={750}
      closable={true}
      title={"Tutorials"}
      onClose={() => setVisible(false)}
    >
      <TopSectionRenderer />
      <ToolsTutorials
        drawerContent={SingleEvalHelp}
        selectedTool={0}
        id={TopSection.QuickLinks[0].link}
      />
      <ToolsTutorials
        drawerContent={DoubleEvalHelp}
        selectedTool={1}
        id={TopSection.QuickLinks[1].link}
      />
      <ToolsTutorials
        drawerContent={TripleEvalHelp}
        selectedTool={2}
        id={TopSection.QuickLinks[2].link}
      />
      <div className="flex flex-row gap-5 mx-5 font-[lato] font-semibold text-lg">
        <p>For Further Support</p>
        <motion.a className="text-blue-500">Support Us</motion.a>
      </div>
    </Drawer>
  );
};

export default Tutorials;
