import React from "react";
import { Link } from "react-router-dom";
import { login } from "@/assets";
import { sample_logo } from "@/assets";
import { Button } from "@nextui-org/react";
import { useState } from "react";
import { useToast } from "./../hooks/use-toast.js";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { motion } from "framer-motion";


import axios from "axios";
import { Toaster } from "./UI/toaster";
import CryptoJS from "crypto-js";

CryptoJS.pad.NoPadding = { pad: function () {}, unpad: function () {} };



var text = "username and password";

var key = CryptoJS.enc.Base64.parse(import.meta.env.VITE_BASE_KEY);
var iv = CryptoJS.enc.Base64.parse(import.meta.env.VITE_BASE_IV);



function encrypt(plainText, secret) {
  var k = CryptoJS.enc.Utf8.parse(secret);
  var cipherText = CryptoJS.AES.encrypt(plainText, k, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  return cipherText.toString();
}

function decrypt(cipherText, secret,iv1) {

  var k = CryptoJS.enc.Utf8.parse(secret);
  var cipherBytes = CryptoJS.enc.Base64.parse(cipherText);

  var decrypted = CryptoJS.AES.decrypt({ ciphertext: cipherBytes }, k, {
    iv: iv1,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return decrypted.toString(CryptoJS.enc.Utf8);
}



const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://127.0.0.1:8000/api/user/signin/", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);
        if (200 <= response.status && response.status <= 299) {
          toast({
            title: "Login Successful",
            description: response.data.message,
            className:
              "bg-emerald-100 dark:bg-emerald-500 font-[lato] rounded-[15px]"
          });
          navigate("/landingpage");
        } else {
          toast({
            title: "Login Failed",
            description: response.data.message,
            className: "bg-red-100 dark:bg-red-500 font-[lato] rounded-[15px]"
          });
          return;
        }

        const access_token = response.data.token;
        const refresh_token = response.data.token;
        const credentials = response.data.user;

        const cred_string = `${credentials.id};${credentials.email};${credentials.username};${credentials.name};${credentials.is_verified}`;

        // setAuth({acessToken:access_token,refreshToken:refresh_token});

        console.log(cred_string);
        console.log(encrypt(cred_string));


      })
      .catch((error) => {
        toast({
          title: "Login Failed",
          description: error.response.data.error,
          className: "bg-red-100 dark:bg-red-500 font-[lato] rounded-[15px]"
        });
      });
  };

  return (
    <div className="flex flex-row items-center h-full ">
      <img src={login} className="hidden lg:inline w-[40%] h-[40%] " />
      <div className="flex flex-col p-4 justify-center border-2 border-white w-full h-full outline-none border-none px-[15%] mb-[10%]">
        <Link to="/landingpage">
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
          className="w-[15%] h-[15%] mx-[43%] mt-[20%]"
          alt="logo"
        />
        <h1 className="font-[montserrat] text-5xl font-semibold mt-[7%] mb-[5%] w-[100%] text-center">
          Welcome Back
        </h1>
        <p className="font-[lato] font-semibold text-lg font-medium mb-[10%] w-[100%] text-center">
          Enter your Credentials to continue.
        </p>
        <p className="font-[lato] font-semibold text-md ">Email</p>
        <input
          type="email"
          onChange={handleEmailChange}
          placeholder="youremail@example.com"
          className="w-[550] h-[50px] text-sm font-semibold my-3 dark:text-white bg-indigo-100 rounded-[15px] dark:bg-[#222226] active:border-1 active:border-gray px-5 font-[lato] outline-none border-none"
        />
        <p className="font-[lato] font-semibold text-md">Password</p>
        <input
          type="password"
          onChange={handlePasswordChange}
          placeholder="Should have atleast 6 characters"
          className="w-[550] h-[50px] my-3 text-sm font-semibold  dark:text-white bg-indigo-100 dark:bg-[#222226] rounded-[15px] px-5 font-[lato] outline-none border-none"
        />

        <Link to="/resetpassword">
          <motion.a
            href="#"
            className="font-[lato] font-semibold text-md text-blue-600 my"
            whileHover={{
              color: "#60a5fa",
              y: -5,
              transitionDuration: 0.2
            }}
            whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
            onHoverEnd={(e) => {}}
            onHoverStart={(e) => {}}
          >
            Forgot Password?
          </motion.a>
        </Link>

        <Button
          onClick={handleSubmit}
          className="w-[550] h-[50px] mt-5 mb-3 text-white rounded-[15px] px-5 font-[lato] font-semibold text-lg outline-none border-none bg-blue-500"
        >
          Login
        </Button>

        <div className="flex flex-row justify-center my-5">
          <p className="">Don't have an account?</p>
          <Link to="/signin" className="mx-5">
            <motion.a
              href="#"
              className=" font-[lato] font-semibold"
              whileHover={{ y: -5, color: "#60a5fa" }}
            >
              Sign In
            </motion.a>
          </Link>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
