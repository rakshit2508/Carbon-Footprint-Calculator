import React, { useState } from 'react';
import logo from '../logo.svg';
import { Link } from 'react-router-dom';

const Header = ({ button1Text, button2Text }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const handleBackClick = () => {
    if (!isMobileMenuOpen) {
      window.location.href = "/"; // Directly go to the home page in desktop view
    }
  };

  return (
    <header className="bg-gray-900 py-4 md:px-8 text-white flex flex-row justify-between items-center relative">
      <div className="flex items-center">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="h-8 mr-2" />
          <h1 className="text-2xl font-bold font-serif">EcoScore</h1>
        </Link>
      </div>
      <div className="hidden md:flex items-center">
        {(button1Text === "Back" && button2Text === "Reduce") && (
          <>
            <div className="relative">
              <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
                {button1Text}
              </button>
            </div>
            <Link to="/reduce" className="bg-blue-500 text-white px-4 py-2 rounded-md">{button2Text}</Link>
          </>
        )}
        {(button1Text === "Calculate" && button2Text === "Reduce") && (
          <>
            <Link to="/carbon-calculator" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">{button1Text}</Link>
            <Link to="/reduce" className="bg-blue-500 text-white px-4 py-2 rounded-md">{button2Text}</Link>
          </>
        )}
        {(button1Text === "Back" && button2Text === "Calculate") && (
          <>
            <div className="relative">
              <button onClick={handleBackClick} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-4">
                {button1Text}
              </button>
            </div>
            <Link to="/carbon-calculator" className="bg-blue-500 text-white px-4 py-2 rounded-md">{button2Text}</Link>
          </>
        )}
      </div>
      <div className="flex items-center md:hidden">
        <button onClick={toggleMobileMenu} className="bg-gray-900 text-white p-2 rounded-md mr-2 focus:outline-none">
          <svg
            className="h-6 w-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      {isMobileMenuOpen && (
        <div className="md:hidden absolute right-0 mt-12 w-32 rounded-md shadow-lg bg-gray-900 ring-1 ring-white ring-opacity-5 z-10">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            {(button1Text === "Back" && button2Text === "Reduce") && (
              <>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button1Text}
                </Link>
                <Link
                  to="/reduce"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button2Text}
                </Link>
              </>
            )}
            {(button1Text === "Calculate" && button2Text === "Reduce") && (
              <>
                <Link
                  to="/carbon-calculator"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button1Text}
                </Link>
                <Link
                  to="/reduce"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button2Text}
                </Link>
              </>
            )}
            {(button1Text === "Back" && button2Text === "Calculate") && (
              <>
                <Link
                  to="/"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button1Text}
                </Link>
                <Link
                  to="/carbon-calculator"
                  className="block px-4 py-2 text-sm text-blue-500 hover:bg-gray-700"
                  role="menuitem"
                  onClick={closeMobileMenu}
                >
                  {button2Text}
                </Link>
              </>
            )}
            <button
              onClick={closeMobileMenu}
              className="block w-full text-left px-4 py-2 text-sm text-blue-500 hover:bg-gray-700 focus:outline-none"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
