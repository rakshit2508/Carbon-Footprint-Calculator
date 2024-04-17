import React, { useEffect, useState } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI('AIzaSyABaNL8OpI3WgedrQw_BWsCgwLPaYprGWI');

const AIIntegration = ({ totalEmissionSubForm1, totalEmissionSubForm2, totalEmissionSubForm3, totalEmissionSubForm4,totalEmissionSubForm5,totalSum }) => {
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setSuggestions([]);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `
          Our Anaerobic Digestion  operation currently emits a total of ${totalSum} tonnes of CO2.
          This is comprised of:
          - ${totalEmissionSubForm1} tonnes from collection of yard waste and food waste in step 1,
          - ${totalEmissionSubForm2} tonnes from Manual Segregation in step 2,
          - ${totalEmissionSubForm3} tonnes from pretreatment of waste in step 3,
          - ${totalEmissionSubForm4} tonnes from Anaerobic Digestion of waste in step 4,
    
         
          
          **We are looking for suggestions to reduce our carbon emissions.**
          Please provide ideas, alternative methods, or process improvements that could help us lower our CO2 output.
        `;
    
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let text = await response.text();
        // Remove asterisks
        text = text.replace(/\*\*/g, ''); // Removing the bold markdown from response
        // Split the text into an array of suggestions
        const suggestionsArray = text.split('\n').filter(suggestion => suggestion.trim().length > 0);
        setSuggestions(suggestionsArray);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      }
    };

    fetchData();
  }, [totalSum, totalEmissionSubForm1, totalEmissionSubForm2, totalEmissionSubForm3, totalEmissionSubForm4]);

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Suggestions to Reduce CO2 Emissions</h2>
      {suggestions.length > 0 ? (
        <ul style={styles.list}>
          {suggestions.map((suggestion, index) => (
            <li key={index} style={styles.listItem}>
              {/* Apply bold style to lines starting with '-' (subheadings) */}
              {suggestion.startsWith('-') ? <span style={{ fontWeight: 'bold' }}>{suggestion}</span> : suggestion}
            </li>
          ))}
        </ul>
      ) : (
        <p style={styles.noSuggestions}>No suggestions available at the moment.</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'left',
  },
  heading: {
    fontSize: '1.2rem',
    marginBottom: '1rem',
    color: '#333',
    fontWeight: 'bold', // Make the subheading bold
    borderBottom: '2px solid #333',
    paddingBottom: '0.5rem',
  },
  list: {
    padding: 0,
    listStyleType: 'none',
  },
  listItem: {
    marginBottom: '0.5rem',
    fontSize: '1rem',
    lineHeight: '1.5',
    paddingLeft: '1.5rem',
    position: 'relative',
  },
  noSuggestions: {
    fontSize: '1.1rem',
    color: '#666',
  },
};

export default AIIntegration;
