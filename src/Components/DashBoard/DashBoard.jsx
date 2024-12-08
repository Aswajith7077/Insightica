import React from 'react'
import Testimonials from './Testimonials'
import FounderInfo from './FounderInfo'
import FAQ from './FAQ';
import { HorizontalChart } from './HorizontalBarChart';
import Pricing from './Pricing';
import Footer from './Footer';
import { LineGraph } from './LineGraph';
import { ActiveUsers } from './ActiveUsers';
import { Profits } from './Profits';
import { OverallUsages } from './OverallUsages';
import NavBar from './NavBar';
import Banner from './Banner';
import { useState } from 'react';

const Dashboard = () => {

  const [isLogged,setIsLogged] = useState(false);

	document.documentElement.classList.add("dark");
	return (
    <div>
      <NavBar onLoginClick={()=>setIsLogged(!isLogged)}/>
      {!isLogged && <Banner/>}
      <div className="flex flex-row justify-center gap-10 my-[5%] pb-10 z-10">
        <Profits className="w-full" />
        <ActiveUsers className="w-full" />
        <LineGraph className="w-full" />
      </div>
      <div className='mx-[10%]'>
        <OverallUsages/>
      </div>
      <Pricing id='tools'/>
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
      <FounderInfo />
      <h1 className="text-4xl font-[montserrat] font-semibold my-10 text-center">
        Our Investors say about us
      </h1>
      <Testimonials id='testimonials'/>
      <FAQ id={'faq'} className={"py-[5%]"} />
      <Footer id='contact'/>
    </div>
  );
}

export default Dashboard;