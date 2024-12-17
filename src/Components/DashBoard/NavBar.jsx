import React from "react";
import { Link } from "react-scroll";
import { FaUserCircle } from "react-icons/fa";



const links = [
  {
    title: "Home",
    link: "home"
  },
  {
    title: "Tools",
    link: "tools"
  },
  {
    title: "Founder",
    link: "founder"
  },
  {
    title: "Testimonials",
    link: "testimonials"
  },
  {
    title: "FAQ",
    link: "faq"
  },
  {
    title: "Contact",
    link: "contact"
  }
];

const NavBar = ({onLoginClick}) => {
  return (
    <navbar className="navbar fixed flex flex-row justify-between w-full px-10 py-10 text-white  bg-[#182433] z-50">
      <h1 className="font-[lato] font-semibold text-5xl">Insightica</h1>
      <div className="flex flex-row font-[lato] gap-10 font-semibold text-lg items-center justify-center">
        {links.map((value, key) => {
          return (
            // <motion.div
            //   // initial={{ borderBottom }}
            //   whileHover={{ borderBottom: 5, borderBottomColor: "#2563eb" }}
            //   whileTap={{ scale: 0.95, transitionDuration: 1 }}
            //   className="w-[7rem] justify-center border-black border-b-5 py-5 cursor-pointer"
            //   key={key}
            // >
            <Link
              key={key}
              to={value.link}
              smooth={true}
              offset={-250}
              className="hidden lg:block text-center lg:text-lg font-semibold cursor-pointer"
            >
              {value.title}
            </Link>
            // </motion.div>
          );
        })}
      </div>

      <div
        className="flex flex-row items-center gap-5 bg-blue-600 cursor-pointer py-2 px-4 rounded-full"
        onClick={onLoginClick}
      >
        <p>Guest</p>
        <FaUserCircle size={36} />
      </div>
    </navbar>
  );
};
// bg-[#0d0e13]
export default NavBar;
