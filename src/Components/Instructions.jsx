import React from "react";
import { CardSpotlight } from "./UI/CardSpotLight";

const Instructions = () => {
  const steps = [1, 2, 3];
  return (
    <div className="mt-[10%]" id="instructions">
      <h1 className="text-3xl font-bold ml-[5%] mt-[5%]">
        How to get Started?
      </h1>
      <div className="mx-[5%] my-[7%] lg:flex sm:flex flex-col lg:flex-row md:grid md:gap-4 md:grid-cols-2 md:grid-rows-2 justify-center">
        {steps.map((value, index) => {
          return (
            <CardSpotlight key={index} className="h-96 w-96 mx-[2%] my-[2%] dark:bg-black rounded-[20px]">
              <p className="text-xl font-bold relative z-20 mt-2 dark:text-white ">
                {`Step ${index + 1}`}
              </p>
              <div className="text-neutral-200 mt-4 relative z-20 font-lato">
                Follow these steps to secure your account:
                
              </div>
              <p className="text-neutral-300 mt-4 relative z-20 text-sm">
                Ensuring your account is properly secured helps protect your
                personal information and data.
              </p>
            </CardSpotlight>
          );
        })}
      </div>
    </div>
  );
};

export default Instructions;
