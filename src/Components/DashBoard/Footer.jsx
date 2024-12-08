import React from "react";
import { motion } from "framer-motion";

const footer_links = {
  company: [
    {
      title: "Support",
      link: "#"
    },
    {
      title: "About",
      link: "#"
    },
    {
      title: "Blog",
      link: "#"
    },
    {
      title: "Press",
      link: "#"
    },
    {
      title: "Careers",
      link: "#"
    }
  ],
  products: [
    {
      title: "Insightica",
      link: "#"
    },
    {
      title: "Stocks",
      link: "#"
    },
    {
      title: "Credit",
      link: "#"
    }
  ],
  offerings: [
    {
      title: "Publisher",
      link: "#"
    },
    {
      title: "Gateway",
      link: "#"
    },
    {
      title: "Brokers",
      link: "#"
    },
    {
      title: "TickerTape",
      link: "#"
    },
    {
      title: "Ecosystem",
      link: "#"
    }
  ],
  "fine Print": [
    {
      title: "Disclosures",
      link: "#"
    },
    {
      title: "Terms & Conditions",
      link: "#"
    },
    {
      title: "Privacy Policy",
      link: "#"
    },
    {
      title: "Investment Tools",
      link: "#"
    },
    {
      title: "Additional Disclosures",
      link: "#"
    }
  ]
};

const Help1 = ({ key_value }) => {
  return (
    <div className="flex flex-col gap-1">
      <h1 className="font-[lato] font-bold text-lg my-10">
        {key_value.charAt(0).toUpperCase() + key_value.slice(1)}
      </h1>
      {footer_links[key_value].map((value, key) => {
        return (
          <motion.a
            whileHover={{ y: -2, color: "#2563eb" }}
						whileTap={{scale:0.95,transitionDuration:0.2}}
            href={value.link}
            className="font-[lato] text-md"
          >
            {value.title}
          </motion.a>
        );
      })}
    </div>
  );
};

const link_titles = [
  "company",
  "products",
  'offerings',
  "fine Print",
]

const Footer = ({id}) => {
  return (
    <div className="flex flex-col bg-[#0d0e13] mt-[5%] items-center" id={id}>
      <div className="flex flex-row w-full px-[5%] py-[4%]">
        <div className="flex md:flex-col flex-row w-1/3">
          <h1 className="text-4xl font-[lato] font-semibold mb-[15%] mr-[5%]">
            Insightica
          </h1>
          <h1 className="ml-5">Get our Insightics right in your inbox!</h1>
          <div className="flex flex-row bg-black w-[27rem] pl-7 justify-between rounded-full my-5 focus:border-white">
            <input
              type="email"
              placeholder="your email"
              className="h-full w-full py-4  bg-transparent outline-none"
            />
            <motion.button
              whileTap={{ scale: 0.9, transitionDuration: 0.2 }}
              className="border rounded-full px-8 bg-blue-600 my-2 text-sm mr-4"
            >
              Submit
            </motion.button>
          </div>
        </div>
        <div className="flex flex-row justify-between w-2/3">
          {link_titles.map((value,key)=>{
            return <Help1 key={key} key_value={value}/>;
          })}
        </div>
      </div>
			<div className="border-t select-none border-white text-center  text-base py-5 mb-5 mt-[5%] w-[95%]">
				Copyrights © 2024 Insightica. All rights reserved.
			</div>
    </div>
  );
};

export default Footer;
