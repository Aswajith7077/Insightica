import React from "react";
import { CardSpotlight } from "./UI/CardSpotLight";

const Instructions = () => {
  const steps = [1, 2, 3];
  return (
    <div className="mt-[10%]">
      <h1 className="text-3xl font-bold ml-[5%] mt-[5%]">
        How to get Started?
      </h1>
      <div className="mx-auto my-[7%] flex flex-row justify-center">
        {steps.map((value, index) => {
          return (
            <CardSpotlight key={index} className="h-96 w-96 mx-[2%] bg-white dark:bg-black">
              <p className="text-xl font-bold relative z-20 mt-2 dark:text-white ">
                {`Step ${index + 1}`}
              </p>
              <div className="text-neutral-200 text-black dark:text-white mt-4 relative z-20">
                Follow these steps to secure your account:
                {/* <ul className="list-none  mt-2">
              <Step title="Enter your email address" />
              <Step title="Create a strong password" />
              <Step title="Set up two-factor authentication" />
              <Step title="Verify your identity" />
            </ul> */}
              </div>
              <p className="text-neutral-300 mt-4 relative z-20 text-black dark:text-white text-sm">
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
