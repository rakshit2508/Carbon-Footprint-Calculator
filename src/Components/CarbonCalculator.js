// CarbonCalculator.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CompostingCalculator from './CompostingCalculator'; // Import the Composting Calculator component
import AutoCalculator from './AutoCalculator'; // Import the Automobiles Calculator component
import IndustryCalculator from './IndustryCalculator'; // Import the Industry Calculator component

const CarbonCalculator = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCalculator, setSelectedCalculator] = useState(0);

  const handleSelectCalculator = (calculatorType) => {
    setSelectedCalculator(calculatorType);
  };
  

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  

  return (
    <div className="flex flex-col min-h-screen bg-black text-white">
      <Header button1Text="Back" button2Text="Reduce" /> {/* Header with black theme */}
      <div className="flex-grow container mx-auto py-8">
        <h1 className="text-3xl font-bold text-center mb-8 font-serif">Carbon Footprint Calculator</h1> {/* Heading */}
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4 mb-8">
          {/* List of horizontal buttons or dropdown */}
          {isDropdownOpen ? (
            <div className="flex flex-col md:flex-row">
              <Link
                to="/carbon-calculator"
                className="px-4 py-2 bg-gray-800 rounded-md mb-4 md:mb-0 md:mr-1"
                onClick={() => {
                  closeDropdown(); // Close the dropdown
                  handleSelectCalculator(1);
                }}
              >
                Anaerobic Digestion
              </Link>
              <Link
                to="/carbon-calculator"
                className="px-4 py-2 bg-gray-800 rounded-md mb-4 md:mb-0 md:mr-1"
                onClick={() => {
                  closeDropdown(); // Close the dropdown
                  handleSelectCalculator(2);
                }}
              >
                Automobiles
              </Link>
              <Link
                to="/carbon-calculator"
                className="px-4 py-2 bg-gray-800 rounded-md mb-4 md:mb-0 md:mr-1"
                onClick={() => {
                  closeDropdown(); // Close the dropdown
                  handleSelectCalculator(3);
                }}
              >
                Industry
              </Link>
              <button onClick={closeDropdown} className="px-4 py-2 bg-gray-800 rounded-md">Close</button>
            </div>
          ) : (
            <button onClick={toggleDropdown} className="px-4 py-2 bg-gray-800 rounded-md">Calculator Options</button>
          )}
        </div>
        {/* Conditionally render the selected calculator component */}
        {selectedCalculator === 1 && <CompostingCalculator />}
        {selectedCalculator === 2 && <AutoCalculator />}
        {selectedCalculator === 3 && <IndustryCalculator />}
        
      </div>
      <Footer />
    </div>
  );
};

export default CarbonCalculator;
