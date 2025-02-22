import axios from "axios";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster.jsx";

import { MdEmail } from "react-icons/md";
import { IoMdLock } from "react-icons/io";

import { useResetContext } from "@/auth/ResetContext";
import OTPInput from "react-otp-input";
import { api } from "@/api/api";

const Email = () => {
  const reset = useResetContext();
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
          reset.setEmail(event.target.value ? event.target.value : "");
        }}
        value={reset.email}
        placeholder="Email"
        className="w-full font-[lato] text-md font-semibold bg-white px-1 py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const Password = () => {
  const reset = useResetContext();
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
        value={reset.password}
        onChange={(event) => {
          reset.setPassword(event.target.value ? event.target.value : "");
        }}
        placeholder="New Password"
        className="w-full font-[lato] text-md font-semibold bg-white px-1 py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const ConfirmPassword = () => {
  const reset = useResetContext();
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
          reset.setConfirmPassword(event.target.value);
        }}
        placeholder="Confirm Password"
        className="w-full font-[lato] text-md px-1 font-semibold bg-white py-1 my-2 rounded-[15px]  outline-none"
      />
    </motion.div>
  );
};

const ResetRequest = () => {
  const reset = useResetContext();
  return (
    <div className="flex flex-col">
      <motion.p
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        }}
        className="font-[lato] text-center text-sm mb-10 font-semibold"
      >
        Don't Worry! Through your email we will a resend code, then you can
        reset your password
      </motion.p>
      <Email />
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 1 },
        }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        onClick={() => handleRequest(reset)}
        className="py-4 mt-10 mb-3 text-white rounded-[20px] px-5 font-[lato] font-semibold text-lg outline-none bg-blue-600"
      >
        Send Link
      </motion.button>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 1.25 },
        }}
        className="flex flex-col md:flex-row justify-center items-center my-5 "
      >
        <p className="font-semibold font-[lato] text-md text-gray-500">
          Haven't recieved any link?
        </p>
        {/* <Link to="/login" className="mx-5"> */}
        <motion.button
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
          whileTap={{ scale: 0.95, transitionDuration: 0.2 }}
          className="text-lg text-center font-semibold font-[lato] text-blue-600 mx-5"
        >
          Resend
        </motion.button>
        {/* </Link> */}
      </motion.div>
    </div>
  );
};

const PasswordSetter = () => {
  const reset = useResetContext();
  return (
    <div className="mx-10 lg:mx-0">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 0.5 },
        }}
        className="flex flex-row items-center gap-2 font-[lato]"
      >
        <p className="font-[lato] text-center text-sm font-semibold">
          We have sent you a 4-digit code to
        </p>
        <h3 className="font-semibold text-blue-500">{reset.email}</h3>
      </motion.div>
      <p className="font-[lato] text-center mb-10 text-sm font-semibold">
        Don't share this code to anyone
      </p>
      <OTPInput
        value={reset.otp}
        onChange={reset.setOtp}
        numInputs={4}
        renderInput={(props) => {
          // console.log(props);
          return (
            <input
              {...props}
              style={{
                width: 50,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              className="w-fit py-3 text-center rounded-xl mx-2 bg-white border text-black font-[lato] font-semibold text-lg"
            />
          );
        }}
      />
      <Password />
      <ConfirmPassword />
      <motion.button
        initial={{ y: 50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, delay: 1 },
        }}
        whileHover={{ scale: 1.01, transition: { duration: 0.2 } }}
        whileTap={{ scale: 0.97, transition: { duration: 0.2 } }}
        onClick={() => handleSetter(reset)}
        className="py-4 mt-10 mb-3 w-full text-white rounded-[20px] px-5 font-[lato] font-semibold text-lg outline-none bg-blue-600"
      >
        Reset Password
      </motion.button>
    </div>
  );
};

const handleRequest = async (reset) => {
  reset.setIsSend(true);
  axios
    .post("http://127.0.0.1:8000/api/user/reset-password-request/", {
      email: reset.email,
    })
    .then((response) => {
      // console.log(response);
      // console.log(response.status);
      reset.toast({
        title: response.data.message,
        description:
          200 <= response.status && response.status <= 299
            ? "Redirecting to Login page"
            : "Failed to Verify your Email",
        className:
          "rounded-[15px] bg-emerald-100 dark:bg-emerald-500 font-[lato]",
      });
    })
    .catch((error) => {
      console.log(error);
      reset.toast({
        title: "Email Verification Failed",
        description: `${error.message}`,
        className: "rounded-[15px] bg-red-100 dark:bg-red-500 font-[lato]",
      });
    });
};

const handleSetter = async (reset) => {
  if (reset.password !== reset.confirmPassword) {
    reset.toast({
      title: "User Creation Failed",
      description: "Invalid Passwords",
      className: "rounded-[15px] bg-red-100 dark:bg-emerald-500 font-[lato]",
    });
    return;
  }
  axios
    .post("http://127.0.0.1:8000/api/user/reset-password/", {
      token: reset.otp,
      new_password: reset.password,
    })
    .then((response) => {
      console.log(response);
      // console.log(response.status);
      reset.toast({
        title: response.data.message,
        description:
          200 <= response.status && response.status <= 299
            ? "Redirecting to Login page"
            : "Failed to Verify your Email",
        className:
          "rounded-[15px] bg-emerald-100 dark:bg-emerald-500 font-[lato]",
      });
      reset.navigate("/login");
    })
    .catch((error) => {
      console.log(error);
      reset.toast({
        title: "Password Reset Failed",
        description: `${error.response.data.error}`,
        className: "rounded-[15px] bg-red-100 dark:bg-red-500 font-[lato]",
      });
    });
};

const ResetPassword = () => {
  const reset = useResetContext();

  return (
    <div className="w-full h-screen bg-[#d6daed] py-[5%] px-[10%]">
      <div className="flex flex-col md:flex-row items-center h-full bg-[#1b2839]  mx-[5%] shadow-xl">
        <div className="hidden lg:flex flex-col h-full w-1/2 items-center justify-center">
          <h1 className="font-[lato] text-center text-white text-5xl font-semibold my-[10%] ">
            {" "}
            Insightica
          </h1>
        </div>
        <div className="w-full lg:w-1/2 h-full bg-[#f6f8fb] flex flex-col px-[10%] py-[3%] justify-center">
          {/* <h1 className="font-[montserrat] font-semibold text-5xl text-center mt-10 mb-5">Welcome</h1> */}
          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{
              y: 0,
              opacity: 1,
              transition: { duration: 0.5, delay: 0.25 },
            }}
            className="font-[montserrat] font-semibold text-3xl text-center  my-10 "
          >
            Reset Your Password
          </motion.h1>
          {!reset.isSend && <ResetRequest />}

          {reset.isSend && <PasswordSetter />}

          <Toaster />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
