import { useEffect, useState, useRef } from "react";
import FAQ from "@/components/dashboard/FAQ";
import Pricing from "@/components/dashboard/Pricing";
import Footer from "@/components/dashboard/Footer";
import BarChart from "@/components/charts/BarChart";
import Banner from "@/components/dashboard/Banner";
import { motion } from "framer-motion";
import { FaArrowUp } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { scroller, Link, animateScroll as scroll } from "react-scroll";
import { useAuth } from "@/auth/AuthContext";
import AreaChart from "@/components/charts/AreaChart";
import PieChart from "@/components/charts/PieCharts";
import Config from "/config/config";
import { useScroll, useTransform } from "framer-motion";
import NavBar from "@/components/dashboard/NavBar.jsx";
import SinglePredictorLeaderboard from "@/components/leaderboard/SinglePredictor.jsx";
import BackTestLeaderBoard from "@/components/leaderboard/BackTest.jsx";

const DashBoard = ({ navState, setNavState }) => {
  const location = useLocation();
  const auth = useAuth();
  const { scrollYProgress } = useScroll();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const navbarRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNavbarVisible(entry.isIntersecting);
      },
      { threshold: 0.1 },
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  const progressValue = useTransform(scrollYProgress, [0, 1], [0, 1]);
  useEffect(() => {
    console.log(progressValue);
    if (progressValue <= 30) setNavState(0);
    else if (progressValue <= 60) setNavState(1);
    else setNavState(2);
  }, [progressValue]); // <-- Add dependency

  useEffect(() => {
    if (location.state?.sectionId) {
      const temp =
        location.state.sectionId === "home" && auth.user === undefined
          ? "banner"
          : location.state.sectionId;
      scroller.scrollTo(temp, {
        duration: 800,
        delay: 0,
        smooth: "easeInOutQuart",
        offset: -100,
      });
    }
  }, [location]);

  return (
    <>
      {isNavbarVisible && (
        <motion.button
          onClick={() => {
            scroll.scrollToTop();
          }}
          className={
            "absolute border-white border-2 bottom-10 rounded-full p-2 right-10 bg-[#182433] text-white"
          }
        >
          <FaArrowUp size={28} />
        </motion.button>
      )}
      <div className="bg-[#f6f8fb] overflow-auto h-screen">
        <NavBar navState={navState} setNavState={setNavState} />
        {auth.user === undefined && <Banner />}
        <div
          className={`items-center flex flex-col gap-10 ${auth.user === undefined ? "my-10" : "py-5"} lg:flex-row justify-center mx-[7%] mb-10 ${auth.user !== undefined ? "pt-[25%] lg:pt-10" : ""}`}
          id="home"
        >
          {/*<div*/}
          {/*  className={`absolute w-full justify-between z-0 ${auth.user === undefined ? "h-[17rem] md:h-[22rem] lg:h-[16rem] bottom-[100px]" : "h-[20rem] top-[40px]"}`}*/}
          {/*></div>*/}
          <BarChart />
          <AreaChart />
        </div>
        <div className="flex flex-col lg:flex-row justify-between gap-10 mx-[7%] ">
          <div className="bg-white rounded-2xl w-full border p-10">
            <PieChart
              elementNumber={1}
              leaderboardUrl={Config.leaderboardSingleUrl}
            />
          </div>
          <div className="bg-white rounded-2xl w-full border p-10">
            <PieChart />
          </div>
          <div className="bg-white rounded-2xl w-full border p-10">
            <PieChart />
          </div>
          {/* <OverallUsages /> */}
        </div>
          <div className={'flex flex-col lg:flex-row gap-10 mx-[7%]'}>
              <SinglePredictorLeaderboard />
              <BackTestLeaderBoard/>
          </div>
        <Pricing id="tools" />
        {/* <div className="flex flex-row mx-[7%] gap-[5%] my-[5%]	">
        <div className="flex flex-col lg:w-1/2">
          <h1 className="font-[montserrat] font-semibold text-center lg:text-left text-5xl my-[5%]">
            We are the leading Trade Optimizers.
          </h1>
          <p className=" text-center lg:text-left my-5">
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
      </div> */}
        {/* <FounderInfo id={"founder"}/> */}
        {/* <h1 className="text-4xl font-[montserrat] text-center  font-semibold mt-[20%] lg:mt-48 mb-20">
        Our Investors say about us
      </h1> */}
        {/* <Testimonials id="testimonials" /> */}
        <FAQ id={"faq"} className={"py-[5%] mb-10"} />
        <Footer id="contact" />
      </div>
    </>
  );
};
export default DashBoard;
