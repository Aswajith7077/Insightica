import React, { useState } from 'react';
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import { motion } from 'framer-motion';

const Accordion = ({value}) => {
	const [isCollapsed,setIsCollapsed] = useState(true);
  return (
    <div>
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`flex flex-row w-[22rem] font-[lato] font-semibold text-lg items-center gap-3 cursor-pointer`}
      >
        {isCollapsed && <IoIosArrowForward size={24} />}
        {!isCollapsed && <IoIosArrowDown size={24} />}
        <motion.h1 whileHover={{ y: -2, color: "#2563eb" }} className={(!isCollapsed)?'text-blue-700':'text-white'}>
          {value.title}
        </motion.h1>
      </div>
      {!isCollapsed && (
        <motion.p
          initial={{ y: -10 }}
          whileInView={{ y: 0, transitionDuration: 0.5 }}
          className="ml-10 my-3 w-[20rem]"
        >
          {value.content}
        </motion.p>
      )}
    </div>
  );
}

export default Accordion;