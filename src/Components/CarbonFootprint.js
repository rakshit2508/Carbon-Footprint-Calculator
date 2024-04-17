import React from 'react';
import { BG_IMG } from '../Utils/constant';

const CarbonFootprintComponent = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center md:justify-between py-8 px-4 md:px-0 bg-gray-900 text-white rounded-lg shadow-lg">
      <div className="md:w-1/2 mb-4 md:mb-0">
      <img src={BG_IMG} alt="Carbon Footprint" className="w-full rounded-lg shadow-lg transition-transform duration-300 transform hover:scale-105" />

      </div>
      <div className="md:w-1/2 md:pl-8 transition-transform duration-300 transform hover:scale-105">
  <h2 className="text-2xl font-bold mb-4 font-serif">What is Carbon Footprint?</h2>
  <p className="text-lg font-serif text-gray-500">
    A carbon footprint measures the total amount of greenhouse gases, primarily carbon dioxide, emitted directly or indirectly by human activities like transportation, energy production, and agriculture. It serves as an indicator of our impact on climate change and the environment. Understanding and reducing our carbon footprint is essential for mitigating global warming and its adverse effects on ecosystems and human well-being. By adopting sustainable practices such as energy conservation, renewable energy adoption, and waste reduction, individuals and organizations can minimize their carbon footprint and contribute to a healthier planet.
  </p>
</div>
    </div>
  );
};

export default CarbonFootprintComponent;
