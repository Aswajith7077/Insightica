import React from "react";
import { motion } from "framer-motion";
import { footerLinks } from "@/constants/Footer";
import * as PropTypes from "prop-types";

class Help1 extends React.Component {
  render() {
    let { key_value } = this.props;
    return (
      <div className="flex flex-col gap-1">
        <h1 className="font-[lato] font-bold text-lg my-10">
          {key_value.charAt(0).toUpperCase() + key_value.slice(1)}
        </h1>
        {footerLinks[key_value].map((value, key) => {
          return (
            <motion.a
              key={key}
              whileHover={{ y: -2, color: "#2563eb" }}
              whileTap={{ scale: 0.95, transition: { Duration: 0.2 } }}
              href={value.link}
              className="font-[source sans 3] text-md  w-fit"
            >
              {value.title}
            </motion.a>
          );
        })}
      </div>
    );
  }
}

Help1.propTypes = { key_value: PropTypes.any };

const link_titles = ["company", "products", "offerings", "fine Print"];

class Footer extends React.Component {
  render() {
    let { id } = this.props;
    return (
      <div
        className="flex flex-col text-[#f6f8fb] pt-[5%] items-center bg-[#182433]"
        id={id}
      >
        <div className="flex flex-col lg:flex-row w-full px-[10%] lg:px-[5%]">
          <div className="flex flex-col mb-10 md:mb-0 w-full lg:w-1/3">
            <h1 className="text-4xl font-[lato] font-semibold mb-5 lg:mb-[15%] mr-[5%]">
              Insightica
            </h1>
            <h1 className="lg:ml-5">Get our Insightics right in your inbox!</h1>
            <div className="flex flex-row border-2 lg:w-2/3 pl-5 justify-between rounded-full mt-20 lg:my-10 focus:border-white">
              <input
                type="email"
                placeholder="Your Email"
                className="h-full w-full py-4 bg-transparent outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.95, transition: { Duration: 0.1 } }}
                whileHover={{ scale: 1.04, transition: { Duration: 0.1 } }}
                className=" rounded-full px-8 text-white bg-blue-600 my-2 font-[source sans 3] text-sm mx-3"
              >
                Submit
              </motion.button>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row justify-between w-full lg:w-2/3">
            {link_titles.map((value, key) => {
              return <Help1 key={key} key_value={value} />;
            })}
          </div>
        </div>
        <div className="border-t select-none border-white text-center text-lg font-semibold py-5 mb-5 mt-[13%] lg:mt-[5%] w-[95%]">
          Copyrights © 2024 Insightica. All rights reserved.
        </div>
      </div>
    );
  }
}

Footer.propTypes = { id: PropTypes.any };

export default Footer;
