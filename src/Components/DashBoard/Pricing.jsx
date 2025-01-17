import React from "react";
import { motion } from "framer-motion";
import { pricing_values } from "@/constants";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { IoCheckmarkDone } from "react-icons/io5";
import { useAuth } from "@/auth/AuthContext";


const Points = ({ content }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  return (
    <div>
      <div className="flex flex-row font-[lato] font-semibold text-[17px] items-center my-2 gap-5 ">
        {!isCollapsed && <IoIosArrowForward size={22} />}
        {isCollapsed && <IoIosArrowDown size={22}/>}
        <motion.h1
          whileHover={{ y: -3, color: "#2563eb" }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="cursor-pointer"
        >
          {content.title}
        </motion.h1>
      </div>
      {isCollapsed && (
        <motion.p
          initial={{ y: -10 }}
          whileInView={{ y: 0, transitionDuration: 2 }}
          className=" ml-[12%] text-justify my-4"
        >
          {content.description}
        </motion.p>
      )}
    </div>
  );
};


const handleToolsNavigation = (link,auth,navigate) => {
  
  // if(auth.user === undefined){
  //   alert('Sign In to User the tools')
  //   return;
  // }
  navigate('/tools')
}

const Button = ({ text, link }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  return (
    // <Link to={"/tools"}>
      <motion.button
        whileHover={{ stroke: "#183f8c", shadow: "" }}
        whileTap={{ scale: 0.95 }}
        onClick={() => handleToolsNavigation(link,auth,navigate)}
        className="rounded-[15px] border-1 border-black bg-[#0d0e13] hover:border-blue-800 w-full py-4 my-10 font-[lato] font-bold text-md text-white"
      >
        {text}
      </motion.button>
    // </Link>
  );
};

// #291ea3

const Card = ({ content }) => {
  return (
    <motion.div
      // whileHover={{scale:1.02}}
      className="rounded-[20px] w-full lg:w-[33rem] h-[65rem] my-[5%] border-1 px-10 lg:px-[2%] py-10 bg-white"
    >
      <h1 className="text-[lato] font-semibold text-3xl text-center">
        {content.title}
      </h1>

      <p className=" mt-10 text-center font-[lato] italic font-semibold text-lg">
        {`"${content.quotes}"`}
      </p>
      <p className="text-center font-[lato] font-semibold text-lg text-gray-500 mt-5">
        {content.description}
      </p>

      <Button text="Try Now" link={content.link} />

      <h2 className="font-[lato] font-semibold text-xl">Key Highlights</h2>
      <ul className="my-5">
        {content.keyHighlights.map((value, key) => {
          return <Points content={value} key={key} />;
        })}
      </ul>

      <h2 className="font-[lato] font-semibold text-xl mt-10">
        Why Should I Use
      </h2>
      <ul className="my-5 items-start justify-start">
        {content.whyShouldIUse.map((value, key) => {
          return (
            <li key={key} className="flex flex-row items-start justify-start gap-3 my-2">
              <FaArrowRight className="mt-1 " size={20} />
              <p className="font-semibold font-[source sans 3] text-gray-600">
                {value}
              </p>
            </li>
          );
        })}
      </ul>

      <h2 className="font-[lato] font-semibold text-xl mt-10">
        Take Aways
      </h2>
      <ul className="my-5 items-start justify-start">
        {content.takeAways.map((value, key) => {
          return (
            <li
              key={key}
              className="flex flex-row items-start justify-start gap-3 my-2"
            >
              <IoCheckmarkDone size={28} />
              <p className="font-semibold font-[source sans 3] text-gray-600">
                {value}
              </p>
            </li>
          );
        })}
      </ul>
      {/* {content.tools.map((value, key) => {
        return <Points content={value} key={key} />;
      })} */}
    </motion.div>
  );
};

const Pricing = ({ id }) => {
  return (
    <div className="flex flex-col my-[10%] mx-[3%] " id={id}>
      <h1 className="font-[montserrat] text-center my-10 lg:my-0 font-semibold text-4xl">
        Meet our Latest Tools
      </h1>
      <div className="flex flex-col items-center lg:items-start h-full lg:flex-row justify-center gap-10 mx-10">
        {pricing_values.map((value, key) => {
          return <Card key={key} content={value} />;
        })}
      </div>
    </div>
  );
};

export default Pricing;
