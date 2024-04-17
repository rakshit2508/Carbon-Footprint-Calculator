import React from 'react';
import Header from './Header';
import Footer from './Footer';
import { useLocation } from 'react-router-dom';
import ResultAndGraph from './ResultAndGraph'; // Component to display results and plot graph
import AIIntegration from './AIIntegration';
import PieCharts from './PieChart';

const ResultPage = () => {
  const location = useLocation();
  const { state } = location;
  const { totalEmissionStep1, totalEmissionStep2, totalEmissionStep3, totalEmissionStep4, totalEmissionStep5, totalEmissionCombined } = state || {};
  // name of variables should be same as passed from the component
  console.log("Total Emissions:", state); // Ensure state is correctly received
  

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header button1Text="Calculate" button2Text="Reduce" />
      <div style={{ flex: 1, padding: '0 16px', marginTop: '20px', marginBottom: '20px' }}>
        <h1 style={{ textAlign: 'center' }}>Your Results!!!</h1>
        <div style={{ marginBottom: '5vw' }}>
          <ResultAndGraph
            totalEmissionSubForm1={totalEmissionStep1}
            totalEmissionSubForm2={totalEmissionStep2}
            totalEmissionSubForm3={totalEmissionStep3}
            totalEmissionSubForm4={totalEmissionStep4}
            totalEmissionSubForm5={totalEmissionStep5}
            totalSum={totalEmissionCombined}
          />
           <PieCharts
            totalEmissionSubForm1={totalEmissionStep1}
            totalEmissionSubForm2={totalEmissionStep2}
            totalEmissionSubForm3={totalEmissionStep3}
            totalEmissionSubForm4={totalEmissionStep4}
            totalEmissionSubForm5={totalEmissionStep5}
            totalSum={totalEmissionCombined}
          />
        </div>
        <AIIntegration 
          totalEmissionSubForm1={totalEmissionStep1}
          totalEmissionSubForm2={totalEmissionStep2}
          totalEmissionSubForm3={totalEmissionStep3}
          totalEmissionSubForm4={totalEmissionStep4}
          totalEmissionSubForm5={totalEmissionStep5}
          totalSum={totalEmissionCombined}
        />
      </div>
      <Footer />
    </div>
  );
};

export default ResultPage;
