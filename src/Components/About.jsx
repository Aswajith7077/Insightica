import React from "react";
import { PinContainer } from "./UI/3dPin";

const About = (className) => {
  return (
    <div
      className={`h-[40rem] w-full flex flex-col items-center justify-center mt-10 mb-10 ${className} `}
      id="about"
    >

      
      <h1 className="text-3xl font-bold">What Actually we do?</h1>
      {/* <PinContainer
        title="We help you here "
        href="https://twitter.com/mannupaaji"
        className='z-0'
      >
        <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
          <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
            Trading
          </h3>
          <div className="text-base !m-0 !p-0 font-normal">
            <span className="text-slate-500 ">
              Cannot predict the price of the stock!
            </span>
          </div>
          <div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
        </div>
      </PinContainer> */}
    </div>
  );
};

export default About;
