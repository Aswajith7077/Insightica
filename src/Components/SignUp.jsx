import React, { useState } from "react";
import { Link } from "react-router-dom";

import { sample_logo } from "@/assets";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { Toaster } from "./UI/toaster";
import { useToast } from "../hooks/use-toast.js";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaArrowLeft } from "react-icons/fa6";


const SignIn = () => {
  const [username,setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password != confirmPassword){
      toast({
        title: "User Creation Failed",
        description: "Invalid Passwords",
        className:
          "rounded-[15px] bg-red-100 dark:bg-emerald-500 font-[lato]"
      });
      return;
    }
    axios
      .post(
        "http://127.0.0.1:8000/api/user/signup/",
        {
          email: email,
          username: username,
          password: password,
          name: `${firstName} ${lastName}`
        },
        headers
      )
      .then((response) => {
        console.log(response);
        console.log(response.status);
        toast({
          title: response.data.message,
          description:
            (200 <= response.status && response.status <= 299)
              ? "Redirecting to Login page"
              : "Failed to Create Account.",
          className:
            "rounded-[15px] bg-emerald-100 dark:bg-emerald-500 font-[lato]"
        });
        if (200 <= response.status && response.status <= 299)
          navigate("/login");
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "User Creation Failed",
          description: `${error.message}`,
          className: "rounded-[15px] bg-red-100 dark:bg-red-500 font-[lato]"
        });
      });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-black to-gray-900 border border-black">
      {/* bg-[#3b82f644] */}
      <div className="flex flex-col md:flex-row items-center h-full min-w-[30rem] my-[3%] bg-emerald-200 rounded-[40px] py-10 px-10 mx-[5%] shadow-xl">
        {/* <img src={login} className="hidden lg:inline w-[40%] h-[40%] mb-[5%]" /> */}
        <div className="flex flex-col h-full w-full items-center">
          <Link to="/landingpage" className="w-full my-5 px-3">
            <motion.button
              whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
              whileHover={{ scale: 1.1, transitionDuration: 0.2 }}
              className="flex flex-row items-center text-blue-500 gap-2 hover:bg-blue-200 px-5 py-2 rounded-full font-semibold bg-transparent font-[lato] text-[14px] "
            >
              <FaArrowLeft size={16} color="#000000" />
              Go Back
            </motion.button>
          </Link>
          <img
            src={sample_logo}
            className="w-[15%] h-[15%] mx-[43%] mt-[5%]"
            alt="logo"
          />
          <h1 className="font-[montserrat] text-center text-4xl font-semibold my-[10%] ">
            {" "}
            Welcome to Insightica
          </h1>
        </div>
        <div className="w-full h-full  flex flex-col px-[7%] py-[3%] justify-center">
          <p className="font-[lato] font-semibold text-md mt-2">User Name</p>
          <input
            type="text"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            placeholder="Username"
            className="min-w-[410px] text-sm  bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
          />
          <div className="flex flex-row place-space-around mt-2">
            <div className="flex flex-col w-full mr-2">
              <p className="font-[lato] font-semibold text-md">First Name</p>
              <input
                type="text"
                placeholder="First Name"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                className="w-[550] text-sm bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
              />
            </div>
            <div className="flex flex-col w-full ml-2">
              <p className="font-[lato] font-semibold text-md">Last Name</p>
              <input
                type="text"
                placeholder="Last Name"
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                className=" text-sm bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
              />
            </div>
          </div>
          <p className="font-[lato] font-semibold text-md mt-2">Email</p>
          <input
            type="email"
            placeholder="youremail@example.com"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            className="min-w-[410px] text-sm bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
          />
          <p className="font-[lato] font-semibold text-md mt-2">Password</p>
          <input
            type="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            placeholder="Should have atleast 6 Characters"
            className="min-w-[410px] text-sm  bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
          />
          <p className="font-[lato] font-semibold text-md mt-2">
            Confirm Password
          </p>
          <input
            type="password"
            onChange={(event) => {
              setConfirmPassword(event.target.value);
            }}
            placeholder="Retype your password"
            className="min-w-[410px] text-sm  bg-indigo-100 h-[50px] my-2 dark:bg-[#222226] dark:text-white rounded-[15px] px-5 font-[lato] outline-none border-none"
          />
          <Button
            onClick={handleSubmit}
            className="min-w-[410px] h-[60px] mt-10 mb-3 text-white rounded-[20px] px-5 font-[lato] font-semibold text-lg outline-none border-none bg-blue-500"
          >
            Sign up
          </Button>
          <div className="flex flex-row justify-center items-center my-5 font-[lato] ">
            <p className="font-semibold text-md">Already have an account?</p>
            <Link to="/login" className="text-lg mx-5">
              <motion.a
                href="#"
                className="text-lg font-semibold text-white"
                whileHover={{ y: -10, color: "#3b82f6" }}
                whileTap={{ scale: 0.95, transitionDuration: 0.2 }}
                onHoverStart={(e) => {}}
                onHoverEnd={(e) => {}}
              >
                Login
              </motion.a>
            </Link>
          </div>
          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
