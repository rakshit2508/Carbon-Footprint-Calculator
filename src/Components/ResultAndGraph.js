import React from 'react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';

const ResultAndGraph = ({ totalEmissionSubForm1, totalEmissionSubForm2, totalEmissionSubForm3, totalEmissionSubForm4, totalEmissionSubForm5, totalSum }) => {
  // Data for the bar chart
  const data = [
    { name: 'Collection', value: totalEmissionSubForm1.toFixed(2), co2: totalEmissionSubForm1 },
    { name: 'Segregation', value: totalEmissionSubForm2.toFixed(2), co2: totalEmissionSubForm2 },
    { name: 'Pretreatment', value: totalEmissionSubForm3.toFixed(2), co2: totalEmissionSubForm3 },
    { name: 'A D', value: totalEmissionSubForm4.toFixed(2), co2: totalEmissionSubForm4 },
    { name: 'BioMethane', value: totalEmissionSubForm5.toFixed(2), co2: totalEmissionSubForm5 },
    { name: 'Cumulative', value: totalSum.toFixed(2), co2: totalSum },
  ];

  // Calculate the maximum value among the total emissions
  const maxEmission = Math.max(totalEmissionSubForm1, totalEmissionSubForm2, totalEmissionSubForm3, totalEmissionSubForm4, totalEmissionSubForm5, totalSum);
  const minEmission = Math.min(totalEmissionSubForm1, totalEmissionSubForm2, totalEmissionSubForm3, totalEmissionSubForm4, totalEmissionSubForm5, totalSum);
  const absMaxEmission = Math.ceil(Math.max(Math.abs(minEmission), Math.abs(maxEmission)));



  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h2 style={{ color: 'black', marginTop: '1rem' }}>Total Carbon Emission: {totalSum.toFixed(2)} Kg </h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 50, right: 30, left: 20, bottom: 50 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" />
          <YAxis label={{ value: 'CO2 Emission (Kg)', angle: -90, position: 'insideLeft', dy: 50 }} domain={[-absMaxEmission, absMaxEmission]} tickCount={absMaxEmission * 2 + 1} />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8">
            {data.map((entry, index) => (
              <Bar key={index} dataKey="value"  />
            ))}
            <Label content={({ value }) => `${value} t`} position="top" fill="#000" />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ResultAndGraph;
