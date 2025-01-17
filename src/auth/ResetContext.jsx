import { createContext } from "react";
import { useContext } from "react";
import { useToast } from "@/hooks/use-toast.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ResetContext = createContext();

const useResetContext = () => {
  const resetContext = useContext(ResetContext);

  if (resetContext === undefined)
    throw new Error("Error : No Reset Context is assigned");

  return resetContext;
};

const ResetProvider = ({ children }) => {
  const [isSend, setIsSend] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [otp,setOtp] = useState();

  const { toast } = useToast();
  const navigate = useNavigate();
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS"
  };

  return (
    <ResetContext.Provider
      value={{
        isSend: isSend,
        setIsSend: setIsSend,
        email: email,
        setEmail: setEmail,
        password: password,
        confirmPassword: confirmPassword,
        otp:otp,
        setOtp:setOtp,
        setPassword: setPassword,
        setConfirmPassword: setConfirmPassword,
        toast: toast,
        navigate: navigate,
        headers: headers
      }}
    >
      {children}
    </ResetContext.Provider>
  );
};

export { useResetContext, ResetProvider };
