import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <div className="bg-[#182433] flex flex-col items-center justify-center pb-10 h-screen">
      <h1 className="text-[256px] w-full text-center font-bold font-[source sans 3] text-white ">
        404
      </h1>
        <p className="text-white font-semibold font-[lato] text-2xl text-center ">
        It seems that the page you are looking for does not exist!
      </p>
      <Link to='/dashboard'>
          <motion.button className='font-[lato] font-semibold text-md text-white py-4 my-10 bg-blue-600 px-10 rounded-2xl'>
            Go Back to Home
          </motion.button>
      </Link>
    </div>
  );
}

export default Error