import React from 'react'
import { sample_logo } from '../assets'
import { AppName, DesignedBy } from '../Constants';

const Footer = () => {
  return (
    <div className="flex flex-col h-[30rem] justify-around font-lato" id="contact_us">
      <div className="mx-[4%]">
        <div className="flex flex-row">
          <img src={sample_logo} alt="sample_logo" className="h-10 mx-3 my-2" />
          <h1 className="font-bold text-[24px] my-2">{AppName}</h1>
        </div>
        <div className="flex flex-row ml-7 my-3">
          <p className="text-sm">A Product By</p>
          <p className="text-sm font-semibold mx-2 text-blue-500 dark:text-blue-600">
            {DesignedBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer