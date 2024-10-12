import React from "react";
import { sample_logo, menu } from "../assets";
import { Switch } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";
import { navLinks } from "@/Constants";
import ResponsiveMenu from "./ResponsiveMenu";


const NavBar = () => {
  
  const AppName = "TradeWiz";
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
      <div className="flex flex-column justify-center inline-block align-middle">
        <img src={sample_logo} className="w-[40px] h-auto" />
        <h1 className="text-bold inline-block align-middle font-bold">
          {AppName}
        </h1>
      </div>
      <div className="w-auto flex justify-center">
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
      <div className="flex flex-row px-2 justify-center">
        <div className="lg:hidden block cursor-pointer mx-3 px-2 py-1 rounded-[10px] bg-white dark:bg-black" onClick={() => {setClick(!click);console.log(click)}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-align-justify">
            <path d="M3 12h18"/>
            <path d="M3 18h18"/>
            <path d="M3 6h18"/>
          </svg>
        </div>
        <Switch defaultSelected isSelected={(theme==='dark'?true:false)} onValueChange={handleThemeSwitch}></Switch>
        
      </div>
      <ResponsiveMenu open={click}/>
    </nav>
  );
};

export default NavBar;
