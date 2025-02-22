import React, { useState } from "react";
import { motion } from "framer-motion";

const ContactForm = () => {
  return (
    <form className="flex flex-col gap-5 mx-10 my-5">
      <input
        type="text"
        placeholder="Your Name"
        required
        name="Name"
        className="bg-white border font-[lato] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />
      <input
        type="email"
        placeholder="Your Email"
        name="Email"
        className="bg-white border font-[lato] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />
      <input
        type="tel"
        id="phone"
        pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
        required
        placeholder="Your Phone Number"
        name="phone"
        className="bg-white border font-[lato] rounded-xl py-3 px-5 w-full font-semibold text-md outline-none"
      />

      <motion.button className="font-[lato] text-lg font-semibold rounded-xl text-white bg-blue-600 py-3">
        Submit
      </motion.button>
    </form>
  );
};

const questions = [
  {
    question: "What is your query related to? (Optional)",
    options: [
      "Platform Usage",
      "Single Evaluator",
      "Double Evaluator",
      "Triple Evaluator",
      "Others",
    ],
  },
  {
    question: "Which feature are you facing issues with? (Optional)",
    options: [
      "Performance Matrix",
      "Metric Wheel",
      "Trend Chart",
      "General Usage",
      "Others",
    ],
  },
];

const checkboxes = [
  {
    name: "checkbox1",
  },
  {
    name: "checkbox2",
  },
  {
    name: "checkbox3",
  },
  {
    name: "checkbox4",
  },
  {
    name: "checkbox5",
  },
];

const CheckBox = ({ name, checked, onChange }) => {
  return (
    <div className="flex flex-row gap-5">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={onChange}
      />
      <p>{name}</p>
    </div>
  );
};

const Support = () => {
  const [queryTo, setQueryTo] = useState(new Set([]));
  const [queryTool, setQueryTool] = useState(new Set([]));
  const [qOther, setQOther] = useState(false);
  const [qTOther, setQTOther] = useState(false);

  const handleChange1 = (e, key) => {
    if (key === questions[0].options.length - 1) setQOther((prev) => !prev);
    if (e.target.checked) {
      setQueryTo((prev) => {
        prev.add(key);
        return prev;
      });
    } else {
      if (queryTo.has(key)) {
        setQueryTo((prev) => {
          prev.delete(key);
          return prev;
        });
      }
    }
  };

  const handleChange2 = (e, key) => {
    if (key === questions[0].options.length - 1) setQTOther((prev) => !prev);
    if (e.target.checked) {
      setQueryTool((prev) => {
        prev.add(key);
        return prev;
      });
    } else {
      if (queryTo.has(key)) {
        setQueryTool((prev) => {
          prev.delete(key);
          return prev;
        });
      }
    }
  };

  return (
    <div className="flex flex-col bg-[#f6f8fb] pt-[25%] lg:pt-[10%] w-full items-center">
      <h1 className="font-[montserrat] font-semibold text-md w-[55%] mb-10 text-center">
        Our team is ready to assist you. Let us know your issue, and we’ll
        ensure it gets resolved promptly.
      </h1>

      <div className="flex flex-col w-[70%]">
        <h2
          className={`font-semibold font-[lato] text-lg`}
        >{`1. ${questions[0].question}`}</h2>
        {questions[0].options.map((val, k) => {
          return (
            <CheckBox
              name={val}
              key={k}
              onChange={(e) => handleChange1(e, k)}
            />
          );
        })}
      </div>

      {qOther && (
        <div className="flex flex-col mt-5 w-[70%]">
          <h2 className="w-[70%] font-semibold font-[lato] text-lg">
            (Optional) Additional context or details about your query.
          </h2>
          <textarea
            name="queries"
            id=""
            placeholder="Your Queries"
            className="border font-semibold rounded-xl h-[15rem] w-full p-5 font-[lato] text-md my-5"
          ></textarea>
        </div>
      )}

      <div className="flex flex-col mt-5 w-[70%]">
        <h2
          className={`font-semibold font-[lato] text-lg`}
        >{`2. ${questions[1].question}`}</h2>
        {questions[1].options.map((val, k) => {
          return (
            <CheckBox
              name={val}
              key={k}
              onChange={(e) => handleChange2(e, k)}
            />
          );
        })}
      </div>

      {qTOther && (
        <div className="flex flex-col mt-5 w-[70%]">
          <h2 className="w-[70%] font-semibold font-[lato] text-lg">
            (Optional) Additional context or details about your query.
          </h2>
          <textarea
            name="queries"
            id=""
            placeholder="Your Queries"
            className="border font-semibold rounded-xl h-[15rem] w-full p-5 font-[lato] text-md my-5"
          ></textarea>
        </div>
      )}

      <div className="flex flex-col mt-5 px-10 w-[75%]">
        <h2 className="font-[lato] font-semibold text-2xl">
          General Query Suggesstion (Optional)
        </h2>
        <p className="font-[lato] font-semibold text-gray-600 mt-4 mx-1 text-md">
          Provide any additional details or comments you wish to share about
          your issue or feedback.
        </p>
        <textarea
          name="description"
          id=""
          placeholder="Your Descriptive Suggesstions"
          className="border font-semibold rounded-xl h-[15rem] w-full p-5 font-[lato] text-md my-5"
        ></textarea>
      </div>

      <div className="flex flex-col w-[70%]">
        <h1
          draggable={true}
          className=" mx-10 font-[lato] font-semibold text-4xl"
        >
          Need More Help?
        </h1>
        <ContactForm />
      </div>
    </div>
  );
};

export default Support;
