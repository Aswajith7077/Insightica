import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster.jsx";
import { useToast } from "@/hooks/use-toast.js";

import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaIdCardAlt } from "react-icons/fa";
import Config from "/config/config";

const UserName = ({ setUsername }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5 },
      }}
      className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-4 font-[lato] "
    >
      <FaUser size={14} className="text-gray-500" />
      <input
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        placeholder="Username"
        className="w-full font-[lato] px-1 text-md font-semibold bg-white py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};
const Name = ({ setFirstName, setLastName }) => {
  return (
    <motion.div className="flex flex-col place-space-around ">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.25 },
        }}
        className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-5 font-[lato] "
      >
        {/* <p className="font-[lato] font-semibold text-md">First Name</p> */}
        <FaIdCardAlt size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="First Name"
          onChange={(event) => {
            setFirstName(event.target.value);
          }}
          className="w-full font-[lato] text-md font-semibold bg-white py-1 my-2 rounded-[15px]  outline-none"
        />
      </motion.div>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        }}
        className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-4 font-[lato] "
      >
        <FaIdCardAlt size={18} className="text-gray-500" />
        {/* <p className="font-[lato] font-semibold text-md">Last Name</p> */}
        <input
          type="text"
          placeholder="Last Name"
          onChange={(event) => {
            setLastName(event.target.value);
          }}
          className="w-full font-[lato] px-1 text-md font-semibold bg-white py-1 my-2 rounded-[15px]  outline-none"
        />
      </motion.div>
    </motion.div>
  );
};

const Email = ({ setEmail, email }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 0.75 },
      }}
      className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-4 font-[lato] "
    >
      <MdEmail size={18} className="text-gray-500" />
      <input
        type="email"
        onChange={(event) => {
          setEmail(event.target.value ? event.target.value : "");
        }}
        value={email}
        placeholder="Email"
        className="w-full font-[lato] text-md font-semibold bg-white px-1 py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const Password = ({ setPassword, password }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 1 },
      }}
      className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-4 font-[lato] "
    >
      <IoMdLock size={18} className="text-gray-500" />
      <input
        type="password"
        value={password}
        onChange={(event) => {
          setPassword(event.target.value ? event.target.value : "");
        }}
        placeholder="Password"
        className="w-full font-[lato] text-md font-semibold bg-white px-1 py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const ConfirmPassword = ({ setConfirmPassword }) => {
  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, delay: 1.25 },
      }}
      className="flex flex-row items-center gap-6 my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-4 font-[lato] "
    >
      <IoMdLock size={18} className="text-gray-500" />
      <input
        type="password"
        onChange={(event) => {
          setConfirmPassword(event.target.value);
        }}
        placeholder="Confirm Password"
        className="w-full font-[lato] text-md px-1 font-semibold bg-white py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const serverUrl = Config.serverUrl;
  const signupUrl = Config.signupUrl;
  const loginUrl = Config.loginRoute;

  const { toast } = useToast();
  const navigate = useNavigate();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast({
        title: "User Creation Failed",
        description: "Invalid Passwords",
        className: "rounded-[15px] bg-red-100 dark:bg-emerald-500 font-[lato]",
      });
      return;
    }
    axios
      .post(
        serverUrl + signupUrl,
        {
          email: email,
          username: username,
          password: password,
          name: `${firstName} ${lastName}`,
        },
        headers
      )
      .then((response) => {
        console.log(response);
        console.log(response.status);
        toast({
          title: response.data.message,
          description:
            200 <= response.status && response.status <= 299
              ? "Redirecting to Login page"
              : "Failed to Create Account.",
          className:
            "rounded-[15px] bg-emerald-100 dark:bg-emerald-500 font-[lato]",
        });
        if (200 <= response.status && response.status <= 299)
          navigate(loginUrl);
      })
      .catch((error) => {
        console.log(error);
        toast({
          title: "User Creation Failed",
          description: `${error.message}`,
          className: "rounded-[15px] bg-red-100 dark:bg-red-500 font-[lato]",
        });
      });
  };

  return (
    <div className="w-full h-screen bg-[#d6daed] py-[5%] px-[10%]">
      <div className="flex flex-col md:flex-row items-center h-full bg-[#1b2839] rounded-2xl  mx-[5%] shadow-xl">
        <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center">
          {/* <Link to="/landingpage" className="w-full my-5 px-3">
            <motion.button
              whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
              whileHover={{ scale: 1.1, transitionDuration: 0.2 }}
              className="flex flex-row items-center text-blue-500 gap-2 hover:bg-blue-200 px-5 py-2 rounded-full font-semibold bg-transparent font-[lato] text-[14px] "
            >
              <FaArrowLeft size={16} color="#000000" />
              Go Back
            </motion.button>
          </Link> */}

          <h1 className="font-[lato] text-center text-white text-5xl font-semibold my-[10%] ">
            {" "}
            Insightica
          </h1>
        </div>
        <form className="w-full lg:w-1/2 h-full bg-[#f6f8fb] rounded-r-2xl flex flex-col px-[10%] py-[3%] justify-center">
          {/* <h1 className="font-[montserrat] font-semibold text-5xl text-center mt-10 mb-5">Welcome</h1> */}
          <p className="font-[lato] font-semibold text-lg text-center  my-10 ">
            Create your New Account
          </p>
          <UserName setUsername={setUsername} />
          <Name setFirstName={setFirstName} setLastName={setLastName} />
          <Email setEmail={setEmail} email={email} />
          <Password setPassword={setPassword} password={password} />
          <ConfirmPassword setConfirmPassword={setConfirmPassword} />

          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 1.5 },
            }}
            whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
            whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
            onClick={handleSubmit}
            className="py-4 mt-10 mb-3 text-white rounded-[20px] px-5 font-[lato] font-semibold text-lg outline-none bg-blue-600"
          >
            Sign up
          </motion.button>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 1.75 },
            }}
            className="flex flex-row justify-center items-center my-5 "
          >
            <p className="font-semibold font-[lato] text-md text-gray-500">
              Already have an account?
            </p>
            <Link to="/login" className="mx-5">
              <motion.button
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95, transitionDuration: 0.2 }}
                className="text-lg font-semibold font-[lato] text-blue-600"
              >
                Login
              </motion.button>
            </Link>
          </motion.div>
          <Toaster />
        </form>
      </div>
    </div>
  );
};

export default SignIn;
