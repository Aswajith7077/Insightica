import React from "react";

const quotes =
  "I'm selfish, impatient and a little insecure. I make mistakes, I am out of control and at times hard to handle. But if you can't handle me at my worst, then you sure as hell don't deserve me at my best.";

const FounderInfo = ({ id }) => {
  return (
    <div id={id} className="flex flex-row items-center mx-[5%]">
      <div className="flex flex-col mx-[10%] my-[5%]">
        <img
          src="https://images.pexels.com/photos/46216/sunflower-flowers-bright-yellow-46216.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt=""
          className="rounded-full w-[105rem] h-[30rem] "
        />
      </div>
      <div className="flex flex-col mx-[5%]">
        <h1 className="text-5xl">Founder Info</h1>
        <h1 className="text-2xl my-[10%] font-[lato]">{quotes}</h1>
      </div>
    </div>
  );
};

export default FounderInfo;
