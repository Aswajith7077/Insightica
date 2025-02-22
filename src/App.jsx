import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useState } from "react";
import { AuthProvider } from "@/auth/AuthContext";

import Documentation from "@/components/dashboard/Documentation";
import Dashboard from "@/components/dashboard/DashBoard";
import ComingSoon from "@/components/ComingSoon";
import Login from "@/components/Login";
import SignIn from "@/components/SignUp";
import NavBar from "@/components/dashboard/NavBar";
import Tools from "@/components/dashboard/Tools";
import Footer from "@/components/dashboard/Footer";
import Error from "@/components/dashboard/Error";
import ResetPassword from "@/components/ResetPassword";
import Support from "@/components/dashboard/Support";
import { ResetProvider } from "@/auth/ResetContext";
import TradingEssentials from "@/components/tradingessentials/TradingEssentials.jsx";
import AboutUs from "@/components/AboutUs.jsx";

function App() {


  const [navState,setNavState] = useState(-1);
  // const [accessToken, setAccessToken] = useState("");
  // const [responseToken, setRefreshToken] = useState("");
  // const [isLogged, setIsLogged] = useState(undefined);
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/docs"
            element={
              <div>
                <NavBar navState={navState} setNavState={setNavState} />
                <Documentation />
              </div>
            }
          />
          <Route
            exact
            path="/dashboard"
            element={
                <Dashboard setNavState={setNavState}/>
            }
          />
          <Route
            exact
            path="/tools"
            element={
              <div>
                <NavBar
                  isSticky={false}
                  navState={navState}
                  setNavState={setNavState}
                />
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
          <Route
            exact
            path="/support"
            element={
              <div className="flex flex-col">
                <NavBar navState={navState} setNavState={setNavState} />
                <Support />
                <Footer />
              </div>
            }
          />
            <Route exact path={'/tradingessentials'} element={
                <TradingEssentials/>
            } />
            <Route exact path="/about" element={<AboutUs />}/>
          <Route
            path="*"
            element={
              <div>
                <NavBar navState={navState} setNavState={setNavState} />
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
