import React from "react";
import { motion } from "framer-motion";
import Accordion from "@/components/dashboard/Accordion";

const leftColumnFAQ = [
  {
    title: "What is Insightica, and who can use it?",
    content: [
      "Insightica is a trading analytics platform designed for everyone—from students to professional traders. It simplifies market analysis using advanced tools like Single, Double, and Triple Evaluators."
    ],
    link: null
  },
  {
    title: "Is Insightica free during the testing phase?",
    content: [
      "Yes, Insightica is completely free during the testing phase, so you can explore all tools and features at no cost"
    ],
    link: null
  },
  {
    title: "How do I get started?",
    content: [
      "Create an account, log in to your dashboard, and start analyzing with our tools. You’ll have instant access to the Single, Double, and Triple Evaluators."
    ],
    link: null
  },
  {
    title: "Are there additional basic utility tools on the platform?",
    content: [
      "Yes, Insightica offers essential utilities like the ROI Calculator, SIP Calculator, and Brokerage Calculator to simplify your trading-related calculations."
    ],
    link: {
      title: "Explore Utility Tools",
      linkTo: "/tradingessentials"
    }
  },
  {
    title: "What makes Insightica unique?",
    content: [
      "Insightica combines professional-grade visuals, intuitive analytics, and a user-friendly interface. Features like heatmaps, radial graphs, and chord diagrams empower you to make data-driven decisions effortlessly."
    ],
    link: null
  }
];

const rightColumnFAQ = [
  {
    title: "How does the Single Evaluator work?",
    content: [
      "The Single Evaluator helps you analyze the performance of one condition across multiple stocks using heatmaps, radial graphs, and bar charts."
    ],
    link: {
      title: "Learn More about Single Evaluator",
      link: ""
    }
  },
  {
    title: "What is the Double Evaluator used for?",
    content: [
      "The Double Evaluator lets you identify and analyze pairs of conditions, showing which combinations deliver the best results. Features include heatmaps, chord diagrams, and multi-metric radial graphs."
    ],
    link: {
      title: "Learn More about Double Evaluator",
      link: ""
    }
  },
  {
    title: "How is the Triple Evaluator different from the others?",
    content: [
      "The Triple Evaluator takes analysis to the next level, enabling you to evaluate triplets of conditions for advanced multi-variable strategies. Tools like triplet chord diagrams and advanced heatmaps are designed for deep insights."
    ],
    link: {
      title: "Learn More about Triple Evaluator",
      link: ""
    }
  },
  {
    title: "What visual tools are available in the evaluators?",
    content: [
      "Single Evaluator: Heatmaps, radial graphs, bar charts.",
      "Double Evaluator: Adds chord diagrams for pairs of conditions.",

      "Triple Evaluator: Extends to triplet chord diagrams and advanced heatmaps."
    ],
    link: {
      title: "Explore Utility Tools",
      linkTo: "/tradingessentials"
    }
  },
  {
    title: "Can I save or share my analysis?",
    content: [
      "Yes, your reports and analyses can be saved directly to your dashboard, and future updates will allow exporting them in different formats."
    ],
    link: null
  }
];

const FAQ = ({ className, id }) => {
  return (
    <div className={className} id={id}>
      <h1 className="font-[montserrat] font-semibold text-4xl text-center">
        Frequently Asked Questions
      </h1>
      <div className="flex flex-row justify-center my-10 text-lg">
        <p className="font-[montserrat]  text-lg">Have more questions? Visit Our</p>
        <button className="mx-1 font-[montserrat] text-lg text-blue-700 hover:text-blue-500 font-semibold hover:cursor-pointer">
          Get Help
        </button>
      </div>
      <div className="flex flex-col mx-[5%] lg:flex-row justify-center gap-10 ">
        <motion.div className="flex flex-col my-5 w-full">
          {leftColumnFAQ.map((value, key) => (
            <Accordion key={key} value={value} />
            // <div className="my-3 bg-white border p-10  rounded-3xl">
            //   <h1 className="text-lg font-[lato] font-semibold">
            //     {value.title}
            //   </h1>
            //   <p className="font-[source sans 3] font-medium text-gray-600 my-3">
            //     {value.content}
            //   </p>
            // </div>
          ))}
        </motion.div>
        <div className="flex flex-col my-5 w-full">
          {rightColumnFAQ.map((value, key) => (
            <Accordion key={key} value={value} />
            // <div className="my-3 bg-white border p-10  rounded-3xl">
            //   <h1 className="text-lg font-[lato] font-semibold">
            //     {value.title}
            //   </h1>
            //   <p className="font-[source sans 3] font-medium text-gray-600 my-3">
            //     {value.content}
            //   </p>
            // </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
