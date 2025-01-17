import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { AuthProvider } from "@/auth/AuthContext";

import Documentation from "@/components/dashboard/Documentation.jsx";
import Dashboard from "@/components/dashboard/DashBoard.jsx";
import ComingSoon from "@/components/ComingSoon.jsx";
import Login from "@/components/Login.jsx";
import SignIn from "@/components/SignUp.jsx";
import NavBar from "@/components/dashboard/NavBar";
import Tools from "@/components/dashboard/Tools";
import Footer from "@/components/dashboard/Footer";
import Error from "@/components/dashboard/Error";
import ResetPassword from "@/components/ResetPassword";
import Support from "./components/dashboard/Support";
import { ResetProvider } from "./auth/ResetContext";

function App() {
  const [accessToken, setAccessToken] = useState("");
  const [responseToken, setRefreshToken] = useState("");
  const [isLogged, setIsLogged] = useState(undefined);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/docs"
            element={
              <div>
                <NavBar />
                <Documentation />
              </div>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
              <div>
                <NavBar />
                <Dashboard />
              </div>
            }
          />
          <Route
            exact
            path="/tools"
            element={
              <div>
                <NavBar />
                <Tools />
                <Footer />
              </div>
            }
          />
          <Route exact path="/" element={<ComingSoon />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signin" element={<SignIn />} />
          <Route
            exact
            path="/resetpassword"
            element={
              <ResetProvider>
                <ResetPassword />
              </ResetProvider>
            }
          />
          <Route exact path="/support" element={<Support />} />
          <Route
            path="*"
            element={
              <div>
                <NavBar />
                <Error />
              </div>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
