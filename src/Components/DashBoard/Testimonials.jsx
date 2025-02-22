import React from "react";
import { motion } from "framer-motion";
import Marquee from "react-fast-marquee";
import { testimonials } from "@/constants/testimonials";

const Card = ({ value }) => {
  return (
    <motion.div
      className="px-10 py-10 border-1 bg-white rounded-[20px] hover:cursor-pointer hover:shadow-md mx-5"
      whileHover={{ scale: 1.05 }}
    >
      <img src="#" alt="" />
      <h1 className="text-xl mb-5 font-[lato] font-bold">{value.user}</h1>
      <p className="w-[20rem] text-sm text-justify">{value.content}</p>
    </motion.div>
  );
};

const Testimonials = ({id}) => {
  return (
    <div id={id}>
      <Marquee
        behavior="scroll"
        direction="left"
        pauseOnHover={true}
        className="mt-[5%] py-5"
      >
        <div className="flex flex-row ">
          {testimonials.map((value, key) => {
            return <Card key={key} value={value} />;
          })}
        </div>
      </Marquee>
      <Marquee
        behavior="scroll"
        direction="right"
        pauseOnHover={true}
        className="mb-[5%] py-5"
      >
        <div className="flex flex-row ">
          {testimonials.map((value, key) => {
            return <Card key={key} value={value} />;
          })}
        </div>
      </Marquee>
    </div>
  );
};

export default Testimonials;
