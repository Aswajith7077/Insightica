import React from 'react';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
import { navLinks } from '@/Constants';
import { Link } from "react-scroll";

const ResponsiveMenu = ({open}) => {
    console.log(open);
  return (
    <AnimatePresence mode="wait">
        {
            open && (
                <motion.div
                    initial = {{opacity: 0, y: -100}}
                    animate = {{opacity: 1,y : 0}}
                    exit = {{opacity: 0,y : -100}}
                    className = "lg:hidden absolute top-20 left-0 w-full h-screen z-10  "
                >
                    <div className='flex flex-col bg-[#eef9fe] dark:bg-[#232327] rounded-[30px] mx-4 py-5'>
                        {navLinks.map((value, index) => {
                            return (
                                <Link
                                key={index}
                                to={value.link}
                                spy={true}
                                smooth={true}
                                offset={50}
                                duration={500}
                                className="hover:bg-blue-600 hover:text-white text-center py-5 lg:block color-black mx-5 lg:text-base font-semibold cursor-pointer rounded-[20px]"
                                >
                                    {value.text.toUpperCase()}
                                </Link>
                            );
                        })}
                    </div>
                </motion.div>
            )
        }
    </AnimatePresence>
  )
}

export default ResponsiveMenu