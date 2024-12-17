import React from "react";
import { sample_logo } from "../assets";
import { Button, Switch } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { Link as Lk } from "react-router-dom";
import { navLinks } from "./../Constants";
import ResponsiveMenu from "./ResponsiveMenu";
import { AppName } from "./../Constants";

import { SunIcon } from "./Sun";
import { MoonIcon } from "./Moon";
import { IoMenu } from "react-icons/io5";


const NavBar = () => {
  
  const [click,setClick] = useState(false);


  const [theme, setTheme] = useState((document.documentElement.classList.contains("dark"))?"dark":"light");
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="navbar fixed flex flex-row justify-between py-7 px-5 lg:px-10 md:px-10 backdrop-blur-3xl w-full z-50">
      <div className="flex flex-column justify-center items-center">
        <img src={sample_logo} className="w-[40px] h-auto" />
        <h1 className="text-bold inline-block align-middle font-bold">
          {AppName}
        </h1>
      </div>
      <div className="ml-[0%] md:ml-[5%]   w-auto flex justify-center items-center">
        {navLinks.map((value, index) => {
          return (
            <Link
              key={index}
              to={value.link}
              spy={true}
              smooth={true}
              offset={50}
              duration={500}
              className="hidden lg:block color-black mx-5 lg:text-base font-semibold cursor-pointer"
            >
              {value.text.toUpperCase()}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-row px-2 justify-center items-center">
        <div
          className="lg:hidden block cursor-pointer mx-3 px-2 py-1 rounded-[10px] bg-white dark:bg-black"
          onClick={() => {
            setClick(!click);
            console.log(click);
          }}
        >
          <IoMenu size={28} />
        </div>
        <Switch
          defaultSelected
          color="#006FEE"
          startContent={<SunIcon />}
          endContent={<MoonIcon />}
          isSelected={theme === "dark" ? false : true}
          onValueChange={handleThemeSwitch}
        ></Switch>

        <div className="flex flex-row">
          <Lk to="/login" className="mx-2">
            <Button className="border-2 bg-transparent border-blue-500 rounded-[16px] font-[lato] text-base  px-5 py-1">
              Login
            </Button>
          </Lk>

          <Lk to="/signin" className="mx-2">
            <Button className="bg-blue-500 rounded-[16px] font-[lato] text-base text-white px-5 py-1">
              Sign In
            </Button>
          </Lk>
        </div>
      </div>
      <ResponsiveMenu open={click} />
    </nav>
  );
};

export default NavBar;
