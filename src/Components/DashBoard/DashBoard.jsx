import React from "react";
import Testimonials from "@/Components/DashBoard/Testimonials";
import FounderInfo from "@/Components/DashBoard/FounderInfo";
import FAQ from "@/Components/DashBoard/FAQ";
import { HorizontalChart } from "@/Components/DashBoard/HorizontalBarChart";
import Pricing from "@/Components/DashBoard/Pricing";
import Footer from "@/Components/DashBoard/Footer";
import { LineGraph } from "@/Components/DashBoard/LineGraph";
import { ActiveUsers } from "@/Components/DashBoard/ActiveUsers";
import { Profits } from "@/Components/DashBoard/Profits";
import { OverallUsages } from "@/Components/DashBoard/OverallUsages";
import NavBar from "@/Components/DashBoard/NavBar";
import Banner from "@/Components/DashBoard/Banner";
import { useState } from "react";

const Dashboard = () => {
  const [isLogged, setIsLogged] = useState(false);

  // document.documentElement.classList.add("dark");
  return (
    <div className="bg-[#f6f8fb]">
      <NavBar onLoginClick={() => setIsLogged(!isLogged)} />
      {!isLogged && <Banner />}
      {/* <div className="absolute w-full h-[20rem] bg-[#182433]"></div> */}
      <div
        className={`flex flex-row justify-center gap-10 py-[3%] mb-10 z-10 ${isLogged ? "pt-[10%]" : ""}`}
        id="home"
      >
        <Profits className="w-full bg-white" />
        <ActiveUsers className="w-full bg-white " />
        <LineGraph className="w-full" />
      </div>
      <div className="mx-[10%] ">
        <OverallUsages />
      </div>
      <Pricing id="tools" />
      <div className="flex flex-row mx-[7%] gap-[5%] my-[5%]">
        <div className="flex flex-col w-[40rem]">
          <h1 className="font-[montserrat] font-semibold text-5xl my-[5%]">
            We are the leading Trade Optimizers.
          </h1>
          <p className="w-[40rem] my-5">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
        <HorizontalChart />
      </div>
      <FounderInfo id={"founder"} />
      <h1 className="text-4xl font-[montserrat] font-semibold my-10 text-center">
        Our Investors say about us
      </h1>
      <Testimonials id="testimonials" />
      <FAQ id={"faq"} className={"py-[5%]"} />
      <Footer id="contact" />
    </div>
  );
};

export default Dashboard;
