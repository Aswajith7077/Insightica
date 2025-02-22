import React from "react";
import { motion } from "framer-motion";
import { footerAboutUs, footerLinks } from "@/constants/Footer";
import * as PropTypes from "prop-types";
import { AppName } from "@/constants/index.js";
import { Link } from "react-router-dom";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

class Help1 extends React.Component {
  render() {
    let { key_value } = this.props;
    return (
      <div className="flex flex-col gap-1">
        <h1 className="font-[lato] font-bold text-lg mt-10 mb-5">
          {key_value.charAt(0).toUpperCase() + key_value.slice(1)}
        </h1>
        {footerLinks[key_value].map((value, key) => {
          return (
            <motion.a
              key={key}
              whileHover={{ y: -2, color: "#2563eb" }}
              whileTap={{ scale: 0.95, transition: { Duration: 0.2 } }}
              href={value.link}
              className="font-[lato] text-md  w-fit"
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

const link_titles = ["Quick Links","Call To Action"];

class Footer extends React.Component {
  render() {
    let { id } = this.props;
    return (
      <div
        className="flex flex-col text-[#f6f8fb] pt-10 items-center bg-[#182433]"
        id={id}
      >
        <div className="flex flex-col lg:flex-row w-full px-10 lg:px-[5%]">
          <div className="flex flex-col mb-5 md:mb-0 w-full lg:w-1/3 ">
            <h1 className="text-4xl font-[lato] font-semibold my-8 lg:mb-[5%]">
              {AppName}
            </h1>
            <h1 className="ml-2">Get our Insightics right in your inbox!</h1>
            <div className="flex flex-row bg-[#f6f8fb] border-2 border-gray-500 lg:w-2/3 pl-5 justify-between rounded-xl mt-20 lg:my-10 ">
              <input
                type="email"
                placeholder="Your Email"
                className="h-full w-full py-4 font-[lato] font-semibold bg-transparent text-black outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.95, transition: { Duration: 0.1 } }}
                whileHover={{ scale: 1.04, transition: { Duration: 0.1 } }}
                className=" rounded-lg px-8 text-white bg-blue-600 m-2 font-[lato] text-sm "
              >
                Submit
              </motion.button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:flex lg:flex-row justify-evenly w-full lg:w-2/3">
            {link_titles.map((value, key) => {
              return <Help1 key={key} key_value={value} />;
            })}
          </div>
          <div className={'flex flex-col mt-10 lg:mt-0 items-center justify-center'}>
            <div>
              <p className={"font-[lato] font-semibold text-lg italic my-3"}>
                {footerAboutUs}
              </p>
              <Link
                to={"/about"}
                className={
                  "font-[lato] font-semibold text-lg text-gray-400 py-5 hover:text-blue-600"
                }
              >
                More about us
              </Link>
            </div>
            <div className={'flex flex-col items-center mt-5 gap-5 '}>
              <h2 className={'font-[lato] font-semibold text-center text-xl w-full py-3'}>Follow Us On</h2>
              <div className={'flex flex-row gap-5 items-center '}>
                <motion.button whileTap={{scale:0.97,transition:{duration:0.2}}}>
                    <FaFacebookSquare size={28}/>
                </motion.button>
                <FaXTwitter size={28}/>
                <FaLinkedin size={28}/>
                <FaYoutube size={28}/>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t select-none border-white text-center text-md font-semibold py-5 mt-[10%] lg:mt-[3%] lg:mt-[5%] w-[95%]">
          {`Copyrights © 2024 ${AppName}. All rights reserved.`}
        </div>
      </div>
    );
  }
}

Footer.propTypes = { id: PropTypes.any };

export default Footer;
