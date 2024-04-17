import React, { useEffect, useState } from 'react';
import { BG_IMG1 } from '../Utils/constant'; // Import your background image here
import { ChevronDownIcon } from '@heroicons/react/solid'; // Import ChevronDownIcon from Heroicons Solid

const texts = ["Sustainable Development","Go Green", "Save Environment", "Use Renewable Energy", ]; // Array of texts to display

const AnimatedContainer = () => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0); // State to keep track of current text index
  const [currentText, setCurrentText] = useState(texts[0]); // Initialize currentText with the first text

  useEffect(() => {
    let timer;
    let textIndex = 0;
    let charIndex = -1; // Start charIndex from -1 to ensure the first letter is included

    const displayText = () => {
      if (charIndex < texts[textIndex].length - 1) { // Check for the last character of the sentence
        charIndex++;
        setCurrentText(texts[textIndex].substring(0, charIndex + 1)); // Set the text from the texts array
        timer = setTimeout(displayText, 100); // Adjust the duration for letter animation
      } else {
        timer = setTimeout(() => {
          setCurrentText('');
          textIndex = (textIndex + 1) % texts.length;
          charIndex = -1; // Reset charIndex to -1 for the new sentence
          setCurrentText(texts[textIndex]); // Update currentText with the new text
          displayText();
        }, 2000); // Delay before displaying next sentence
      }
    };

    displayText();

    return () => clearTimeout(timer); // Clear timer on component unmount
  }, []);

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="absolute inset-0">
        {/* Background image */}
        <img src={BG_IMG1} alt="Background" className="absolute inset-0 w-full h-full object-cover" />
        {/* Gradient overlay */}
        <div className="absolute inset-0 "></div>
      </div>

      {/* Centered text */}
      <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center">
        <h2 className="text-4xl md:text-6xl font-bold mb-4 font-serif">{currentText}</h2>
        {/* Custom button with pointing down effect */}
        <div className="mt-8 flex flex-col items-center">
          <p className="text-lg md:text-xl">Scroll Down</p>
          <ChevronDownIcon className="h-12 w-12 md:h-16 md:w-16 text-white animate-bounce mt-2" />
        </div>
      </div>
    </div>
  );
};

export default AnimatedContainer;
