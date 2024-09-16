import React from 'react'
import { sample_logo } from '../assets'
import { AppName, DesignedBy } from '../Constants';

const Footer = () => {
  return (
    <div className="flex flex-col h-[20rem] justify-around">
      <div className="mx-10">
        <div className="flex flex-row">
          <img src={sample_logo} alt="sample_logo" className="w-10" />
          <h1 className="font-bold text-[24px]">{AppName}</h1>
        </div>
        <div className="flex flex-row ml-2 mt-2">
          <p className="text-sm ">A Product By</p>
          <p className="text-sm font-semibold mx-2 text-blue-500 dark:text-blue-600">
            {DesignedBy}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer