// InfoCardsComponent.js

import React from 'react';
import { CalculatorIcon, ArrowDownIcon } from '@heroicons/react/solid'; // Import CalculatorIcon and ArrowDownIcon from Heroicons Solid
import { Link } from 'react-router-dom';

const InfoCardsComponent = () => {
  return (
    <div className="flex flex-col md:flex-row justify-center items-center py-8 px-4 md:px-0">
      <div className="max-w-xs md:max-w-md w-full mx-4 bg-white rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition duration-300 mb-4 md:mb-0 flex flex-col items-center"> {/* Changed flex direction to column and centered items */}
        <div className="p-6">
          <div className="mb-4">
            <CalculatorIcon className="h-10 w-10 text-blue-500" /> {/* Increased icon size */}
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-medium text-blue-500 font-serif mb-1">Calculate</h3> {/* Increased heading size, applied blue color, and serif font */}
            <p className="text-base text-blue-500 font-serif"> Measure emissions from activities to understand environmental impact and promote sustainability to save Mother Earth.</p> {/* Applied blue color and serif font */}
          </div>
        </div>
        <Link to="/carbon-calculator" className="text-base bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-full mb-4">Know More</Link> {/* Moved button below the text */}
      </div>
      <div className="max-w-xs md:max-w-md w-full mx-4 bg-white rounded-lg shadow-lg border border-gray-200 transform hover:scale-105 transition duration-300 mb-4 md:mb-0 flex flex-col items-center"> {/* Changed flex direction to column and centered items */}
        <div className="p-6">
          <div className="mb-4">
            <ArrowDownIcon className="h-10 w-10 text-orange-500 transform rotate-0" /> {/* Increased icon size, changed color to orange, and rotate it */}
          </div>
          <div className="text-center">
            <h3 className="text-xl md:text-2xl font-medium text-orange-500 font-serif mb-1">Reduce</h3> {/* Increased heading size, applied orange color, and serif font */}
            <p className="text-base text-orange-500 font-serif">Reduce carbon emissions by adopting sustainable practices: renewable energy, efficient transportation, and waste reduction.</p> {/* Applied orange color and serif font */}
          </div>
        </div>
        <Link  to="/reduce"  className="text-base bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-6 rounded-full mb-4">Know More</Link> {/* Moved button below the text */}
      </div>
    </div>
  );
};

export default InfoCardsComponent;
