import React from "react";
import { sample_logo } from "./../assets";
import {
  AppName,
  DesignedBy,
  footerItems,
  footerLinks,
  footerTitle
} from "../Constants";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <div
      className="flex flex-col pt-[10%] lg:pt-[5%] font-lato bg-gradient-to-b from-indigo-100 dark:from-[#222226]"
      id="contact_us "
    >
      <div className="flex flex-col lg:flex-row md:flex-row ">
        <div className="mx-[2%] lg:w-[50%] md:w-[40%]">
          <div className="flex flex-row">
            <img
              src={sample_logo}
              alt="sample_logo"
              className="h-10 mx-3 my-2"
            />
            <h1 className="font-bold font-[lato] text-[24px] my-2">
              {AppName}
            </h1>
          </div>
          <div className="flex flex-row ml-7 my-3">
            <p className="text-sm font-[lato]">A Product By</p>
            <p className="text-sm font-semibold font-[lato] mx-2 text-blue-500 dark:text-blue-600">
              {DesignedBy}
            </p>
          </div>
        </div>
        <div className="w-full mx-5 lg:mx-0 md:mx-0 lg:flex md:flex lg:flex-row lg:justify-around md:flex-row md:justify-between px-2 grid gap-10 grid-cols-2 grid-rows-2 justify-center my-10 lg:mb-[5%]">
          {footerItems.map((value, key) => {
            return (
              <div className="flex flex-col mx-5" key={key}>
                <h1 className="font-[lato] font-bold text-xl">{value.title}</h1>
                <div className="flex flex-col mt-7">
                  {value.links.map((valueElement, k) => {
                    return (
                      <motion.a
                        key={k}
                        href={valueElement.link}
                        className="my-1"
                        whileHover={{
                          color: "#60a5fa",
                          y: -5,
                          transitionDuration: 0.2
                        }}
                        whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
                      >
                        {valueElement.text}
                      </motion.a>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="border-t-2 mt-2 dark:border-[#222226] mx-[1%] flex flex-col md:flex-row lg-flex-row px-3 py-5 justify-between">
        <p className="font-[lato] text-base">{footerTitle}</p>
        <div className="flex flex-col md:flex-row mt-10 md:mt-0 lg:mt-0 ">
          {footerLinks.map((value, key) => {
            return (
              <a
                key={key}
                href={value.link}
                className={`text-sm font-[lato] font-bold mx-2 mt-2 text-blue-600`}
              >
                {value.text}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Footer;
