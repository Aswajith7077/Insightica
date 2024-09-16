import React from "react";
import { sample_logo } from "../assets";
import { Switch } from "@nextui-org/react";

import { useEffect, useState } from "react";
import { Link } from "react-scroll";


const NavBar = () => {
  const navLinks = [
    {
      text: "Home",
      link: "/",
    },
    {
      text: "About",
      link: "about",
    },
    {
      text: "Instructions",
      link: "instructions",
    },
    {
      text: "Examples",
      link: "examples",
    },
    {
      text: "Contact Us",
      link: "contact_us",
    },
  ];
  const AppName = "TradeWiz";

  const [theme, setTheme] = useState((document.documentElement.classList.contains("dark"))?"dark":"light");
  useEffect(() => {
    if (theme === "dark") document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [theme]);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <nav className="flex flex-row justify-between my-7 mx-10">
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
              className="color-black mx-5 font-semibold"
            >
              {value.text.toUpperCase()}
            </Link>
          );
        })}
      </div>
      <div className="flex flex-row px-2 ">
        <Switch defaultSelected isSelected={(theme==='dark'?true:false)} onValueChange={handleThemeSwitch}>Dark mode</Switch>
      </div>
    </nav>
  );
};

export default NavBar;
