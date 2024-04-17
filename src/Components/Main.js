// Main.js

import React from 'react';
import AnimatedContainer from './AnimatedContainer';
import CarbonFootprint from './CarbonFootprint';
import InfoCards from './InfoCards';

const Main = () => {
  return (
    <main className="container mx-auto">
      <AnimatedContainer />
      <CarbonFootprint/>
      <InfoCards/>
      {/* Add other components/content here */}
    </main>
  );
};

export default Main;
