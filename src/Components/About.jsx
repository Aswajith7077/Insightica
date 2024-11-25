import React from "react";
import { PinContainer } from "./UI/3dPin.jsx";

const About = (className) => {
  return (
    <div
      className={`h-[40rem] w-full flex flex-col items-center justify-center mt-10 mb-10 ${className} `}
      id="about"
    >

      
      <h1 className="text-3xl font-bold">What Actually we do?</h1>
      
    </div>
  );
};

export default About;
