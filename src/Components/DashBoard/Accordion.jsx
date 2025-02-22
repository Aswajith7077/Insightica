import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion } from "framer-motion";

const Accordion = ({ value }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  return (
    <div className=" px-5 py-3 rounded-xl">
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`flex flex-row w-full font-[lato] font-semibold text-lg  items-center gap-3 cursor-pointer`}
      >
        {isCollapsed && <IoIosArrowForward size={24} />}
        {!isCollapsed && <IoIosArrowDown size={24} />}
        <h1 className="text-lg font-[lato] hover:text-blue-600 font-semibold">
          {value.title}
        </h1>
      </div>
      {!isCollapsed && (
        <motion.p
          initial={{ y: -10 }}
          whileInView={{ y: 0, transitionDuration: 0.5 }}
          className="font-[lato] font-medium text-gray-600 my-2 ml-10"
        >
          {value.content}
        </motion.p>
      )}

      {/* <div className="my-3 bg-white border p-10  rounded-3xl">
        <p className="font-[lato] font-medium text-gray-600 my-3 ml-10">
          {value.content}
        </p>
      </div> */}
      {!isCollapsed && <div></div>}
    </div>
  );
};

export default Accordion;
