import React, { useState, useEffect, useRef } from "react";
import { AppName, menuLinks, navLinks } from "@/constants";
import { Link as Lk } from "react-router-dom";
import { api } from "@/api/api";

import { FaUserCircle } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import { FaPaintBrush } from "react-icons/fa";

import { IoMenu } from "react-icons/io5";
import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";
import { useAuth } from "@/auth/AuthContext";
const formatName = (name) => {
  let names = name.split(" ");
  let result = "";
  names.forEach((value) => {
    result +=
      value[0].toUpperCase() + value.toLowerCase().slice(1, value.length) + " ";
  });
  return result;
};

const userMenuItems = [
  {
    title: "Edit Profile",
    icon: <FaUserEdit size={20} />,
  },
  {
    title: "Appearance",
    icon: <FaPaintBrush size={20} />,
  },
];

const handleSignOut = async (auth) => {
  try {
    const response = await api.post(import.meta.env.VITE_BASE_SIGNOUT_URL);
    auth.setUser(undefined);
    localStorage.removeItem(import.meta.env.VITE_BASE_LOCAL_STORAGE_ACCESS_KEY);
    localStorage.removeItem(
      import.meta.env.VITE_BASE_LOCAL_STORAGE_REFRESH_KEY
    );
    localStorage.removeItem(import.meta.env.VITE_BASE_LOCAL_STORAGE_USER_KEY);
    console.log(response.data);
  } catch (e) {
    console.log("Cannot Sign Out" + e.message);
  }
};

const NavBar = ({ navState, setNavState, isSticky = true }) => {
  const navigate = useNavigate();
  const [isMenuOpened, setIsMenuOpened] = useState(false);
  const [signInMenu, setSignInMenu] = useState(false);
  const auth = useAuth();


  const handleNavigation = (route, id) => {
    console.log(route, id);
    navigate(route, { state: { sectionId: id } });
  };

  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpened(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsMenuOpened]);

  return (
    <navbar
      className={`navbar flex flex-row items-center justify-between drop-shadow-xl w-full px-10 py-5 text-white bg-[#182433] `}
    >
      <h1 className="font-[lato] font-semibold text-3xl">{AppName}</h1>
      <div
        className={` justify-self-center ${!auth.user ? "translate-x-20" : ""} top-[30px] flex flex-row font-[lato] gap-10 font-semibold text-lg items-center justify-center`}
      >
        {navLinks.map((value, key) => {
          return (
            <motion.button
              key={key}
              onClick={() => {
                handleNavigation(value.route, value.link);
              }}
              className={`hidden lg:block text-center lg:text-lg font-semibold cursor-pointer hover:text-white ${navState === key ? "text-white" : "text-gray-400"}`}
            >
              {value.title}
            </motion.button>
          );
        })}
      </div>



      <div className="flex flex-row gap-5 items-center font-semibold font-[lato]">
        {/* <div className="flex flex-col justify-right"> */}
        <motion.button
          onClick={() => {
            // e.stopPropagation();
            if (signInMenu) setSignInMenu(false);
            if (!isMenuOpened) setIsMenuOpened(true);
          }}
          whileHover={{ backgroundColor: "#FFFFFF44",transition:{duration:0.5} }}
          className="flex p-3 rounded-xl"
        >
          <IoMenu size={28} />
        </motion.button>

        {isMenuOpened && (
          <div
            ref={menuRef}
            className={`flex flex-col top-20 ${auth.user === undefined ? "right-[150px]" : "right-[200px]"} absolute rounded-2xl border bg-white text-black p-5  gap-5 z-50`}
          >
            {menuLinks.map((value, key) => {
              return (
                <Lk to={value.route} key={key}>
                  <motion.button>{value.title}</motion.button>
                </Lk>
              );
            })}
            <Lk to={navLinks[navLinks.length - 2].route} className="lg:hidden">
              {navLinks[navLinks.length - 2].title}
            </Lk>
            <Lk to={navLinks[navLinks.length - 1].route} className="lg:hidden">
              {navLinks[navLinks.length - 1].title}
            </Lk>
          </div>
        )}

        {/* {auth.user === undefined && (
          <Lk to="/login">
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.2 } }}
              className="px-5 py-3 w-[6rem] border-blue-600 border-2 rounded-2xl bg-blue-600"
            >
              Login
            </motion.button>
          </Lk>
        )} */}
        {auth.user === undefined && (
          <Lk to="/signin">
            <motion.button
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.2 } }}
              onClick={() => {
                setNavState(-1);
              }}
              className="px-5 py-3 w-[6rem] border rounded-2xl"
            >
              Sign In
            </motion.button>
          </Lk>
        )}
        {auth.user !== undefined && (

          <motion.div
            whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
            className="flex flex-row cursor-pointer items-center"
            onClick={() => {
              if (isMenuOpened) setIsMenuOpened(false);
              setSignInMenu((prev) => !prev);
            }}
          >
            <FaUserCircle size={44} />
            <div className={"mx-3"}>
              <h1
                className={"hidden md:block font-[lato] font-semibold text-lg"}
              >
                {auth.user.name}
              </h1>
              <p className="font-[lato] font-bold text-gray-400 text-xs">
                Basic Plan
              </p>
            </div>
          </motion.div>
        )}


        {auth.user && signInMenu && (
          <div
            className={`flex flex-col top-20 ${auth.user === undefined ? "right-[270px]" : "right-10"} p-5 absolute items-center bg-white border  text-black rounded-2xl z-[9999]`}
          >
            <h1 className="font-[lato] font-semibold text-2xl">
              {auth.user.name}
            </h1>
            <h2 className="font-[lato] font-semibold text-md text-gray-500">
              {auth.user.email}
            </h2>
            <ul className="my-10 flex flex-col font-[lato] gap-3 text-md">
              {userMenuItems.map((value, key) => {
                return (
                  <motion.li
                    key={key}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="flex flex-row cursor-pointer items-center gap-3 mx-5"
                  >
                    {value.icon}
                    <h2>{value.title}</h2>
                  </motion.li>
                );
              })}
            </ul>
            <motion.button
              whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
              whileTap={{ scale: 0.96, transition: { duration: 0.2 } }}
              className="bg-[#db2777] w-[13rem] text-white rounded-xl py-3 px-5"
              onClick={() => handleSignOut(auth)}
            >
              Sign Out
            </motion.button>
          </div>
        )}
      </div>
    </navbar>
  );
};

export default NavBar;
