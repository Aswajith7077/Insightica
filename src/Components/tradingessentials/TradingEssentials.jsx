import { useState } from "react";
import SIPCalculator from "@/components/tradingessentials/SIPCalculator.jsx";
import BrokerageCalculator from "@/components/tradingessentials/BrokerageCalculator.jsx";
import InvestmentCalculator from "@/components/tradingessentials/InvestmentCalculator.jsx";
import AnnualReturnCalculator from "@/components/tradingessentials/AnnualReturnCalculator.jsx";
import NavBar from "@/components/dashboard/NavBar.jsx";
import Footer from "@/components/dashboard/Footer.jsx";
// import { Footer } from "antd/es/modal/shared.js";
// import SIPCalculator from "./SIPCalculator";

const calculators = [
  "SIP Calculator",
  ,
  "Brokerage Calculator",
  "Investment Calculator",
  "Annual Return Calculator",
  // "Lumpsum Calculator",
  // "SWP Calculator",
  // "Mutual Fund Returns Calculator",
  // "Sukanya Samriddhi Yojana Calculator",
  // "Income Tax Calculator",
  // "PPF Calculator",
  // "EPF Calculator",
  // "FD Calculator",
  // "RD Calculator",
  // "GST Calculator"
];

const TradingEssential = () => {
  const [selectedCalculator, setSelectedCalculator] =
    useState("SIP Calculator");

  const renderCalculator = () => {
    switch (selectedCalculator) {
      case "SIP Calculator":
        return <SIPCalculator />;
      case "Brokerage Calculator":
        return <BrokerageCalculator />;
      case "Investment Calculator":
        return <InvestmentCalculator />;
      case "Annual Return Calculator":
        return <AnnualReturnCalculator />;
      default:
        return <div className="p-4">Calculator not available</div>;
    }
  };

  return (
    <div className={''}>
      <NavBar />
      <div className="flex font-[lato] min-h-[50rem]">
        <div className="w-1/4 p-4 border-r">
          <h2 className="font-semibold text-lg mb-4">Popular Calculators</h2>
          <ul>
            {calculators.map((calc) => (
              <li
                key={calc}
                className={`cursor-pointer p-2 rounded ${
                  selectedCalculator === calc ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedCalculator(calc)}
              >
                {calc}
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4 p-4">{renderCalculator()}</div>
      </div>
      {/*<Footer />*/}
		<Footer/>
    </div>
  );
};

export default TradingEssential;
