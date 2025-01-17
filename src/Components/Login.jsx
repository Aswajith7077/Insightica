import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import axios from "axios";
import { deserializeUser, encrypt, serializeUser } from "@/components/tools/Cryptography";
import { useToast } from "@/hooks/use-toast.js";
import { Toaster } from "@/components/ui/toaster.jsx";

import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";
import { useAuth } from "@/auth/AuthContext";

const Auxilary = ({ email, password, setEmail, setPassword, handleSubmit }) => {
  return (
    <div className="flex flex-col bg-[#f6f8fb]  p-4 justify-center border w-full lg:w-1/2 h-full outline-none  py-[5%]">
      {/* <Link to="/landingpage">
          <motion.button
            whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
            whileHover={{ scale: 1.1, transitionDuration: 0.2 }}
            className="flex flex-row items-center text-blue-500 gap-2 hover:bg-blue-200 px-5 py-2 rounded-full font-semibold bg-transparent font-[lato] text-[14px] "
          >
            <FaArrowLeft size={16} color="#" />
            Go Back
          </motion.button>
        </Link> */}
      <form className="flex flex-col px-[20%]">
        <motion.h1
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1, transition: { duration: 0.5 } }}
          className="font-[montserrat] text-5xl font-semibold my-10 w-[100%] text-center"
        >
          Welcome Back
        </motion.h1>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.25 }
          }}
          className="font-[lato] text-lg font-semibold mb-[10%] w-[100%] text-center"
        >
          Enter your Credentials to continue.
        </motion.p>
        {/* <p className="font-[lato] font-semibold text-md ">Email</p> */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.5 }
          }}
          className="flex flex-row items-center gap-6 w-[550] h-[50px] text-md font-semibold my-3 dark:text-white bg-white border rounded-[15px] dark:bg-[#222226] active:border-1 active:border-gray px-5 font-[source sans 3] outline-none"
        >
          <MdEmail size={18} className="text-gray-500" />
          <input
            autoFocus={false}
            type="email"
            onChange={(event) => {
              setEmail(event.target.value ? event.target.value : "");
            }}
            value={email}
            placeholder="Email"
            className="w-full outline-none h-full"
          />
        </motion.div>
        {/* <p className="font-[lato] font-semibold text-md">Password</p> */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.75 }
          }}
          className="flex flex-row items-center gap-6 w-[550] h-[50px] my-3 text-md font-semibold  dark:text-white bg-white border dark:bg-[#222226] rounded-[15px] px-5 font-[source sans 3] "
        >
          <IoMdLock size={18} className="text-gray-500" />
          <input
            type="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value ? event.target.value : "");
            }}
            placeholder="Password"
            className="w-full outline-none h-full"
          />
        </motion.div>
        <Link to="/resetpassword">
          <motion.button
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 1 }
            }}
            whileHover={{
              y: -5,
              transitionDuration: 0.2
            }}
            whileTap={{ scale: 0.93, transitionDuration: 0.2 }}
            className="font-[lato] font-semibold text-md text-blue-600 my-5"
          >
            Forgot Password?
          </motion.button>
        </Link>
        <motion.button
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 1.25 }
          }}
          whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.98, transition: { duration: 0.2 } }}
          onClick={handleSubmit}
          className="w-[550] mb-3 text-white rounded-[15px] px-5 py-3 font-[lato] font-semibold text-lg outline-none border-none bg-blue-600"
        >
          Login
        </motion.button>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, delay: 1.5 }
          }}
          className="flex flex-row justify-center items-center my-5"
        >
          <p className="text-gray-500 font-semibold ">
            {"Don't have an account?"}
          </p>
          <Link to="/signin" className="mx-5">
            <motion.button
              className=" font-[lato] text-lg font-semibold"
              whileHover={{ y: -5, color: "#60a5fa" }}
            >
              Sign In
            </motion.button>
          </Link>
        </motion.div>
        <Toaster />
      </form>
    </div>
  );
};

const Login = () => {
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(email, password);
    axios
      .post("http://127.0.0.1:8000/api/user/signin/", {
        email: email,
        password: password
      })
      .then((response) => {
        console.log(response);
        if (200 <= response.status && response.status <= 299) {
          
          console.log("navigate");
          navigate("/dashboard");
        } else {
          toast({
            title: "Login Failed",
            description: response.data.message,
            className: "bg-red-100 dark:bg-red-500 font-[lato] rounded-[15px]"
          });
          return;
        }

        const access_token = response.data.access;
        const refresh_token = response.data.refresh;
        const credentials = response.data.user;

        const cred_string = {
          userId: credentials.id,
          email: credentials.email,
          userName: credentials.username,
          name: credentials.name,
          isVerified: credentials.is_verified
        };

        auth.setAccessToken(access_token);
        auth.setRefreshToken(refresh_token);
        auth.setUser(cred_string);

        
        localStorage.setItem(
          import.meta.env.VITE_BASE_LOCAL_STORAGE_ACCESS_KEY,
          encrypt(refresh_token)
        );
        localStorage.setItem(
          import.meta.env.VITE_BASE_LOCAL_STORAGE_REFRESH_KEY,
          encrypt(access_token)
        );
        localStorage.setItem(
          import.meta.env.VITE_BASE_LOCAL_STORAGE_USER_KEY,
          serializeUser(cred_string)
        );
        
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
    <div className="flex flex-row bg-[#d6daed] items-center h-screen justify-center ">
      <div className="flex flex-row w-[75%]  bg-gradient-to-br from-[#182433]  shadow-xl to-[#24364d] items-center">
        <div className="hidden lg:flex w-1/2 h-full items-center justify-center">
          <h1 className="font-[lato] font-semibold text-5xl text-white">
            Insightica
          </h1>
        </div>
        <Auxilary
          handleSubmit={handleSubmit}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />
      </div>
    </div>
  );
};

export default Login;
