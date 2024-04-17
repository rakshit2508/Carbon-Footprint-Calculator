import React from 'react';
import Header from './Header'; // Import your Header component
import Footer from './Footer'; // Import your Footer component

const ReduceEmission = () => {
  // Sample data for suggestions (replace with your actual data)
  const suggestions = [
    { id: 1, heading: 'Renewable Energy Sources', image: 'https://thumbs.dreamstime.com/b/renewable-energy-sources-digital-illustration-32992072.jpg', text: 'Renewable Energy Sources: Shift to biohydrogen and renewables for clean, sustainable energy, slashing carbon emissions and fostering a greener future', button: 'https://www.un.org/en/climatechange/what-is-renewable-energy?gad_source=1&gclid=CjwKCAjw8diwBhAbEiwA7i_sJR4Ma_i19fApF2ZdFjcTRxWmEsy5YmA5RyVcNEqMDp-Sc7tWqIxhMxoCQAIQAvD_BwE' },
    { id: 2, heading: 'Recycle More', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHHkT1YIeWB2XtNBs8KcFvrKULp_-1mvm-j2lmSybPpQ&s', text: 'Recycle More: Boosting recycling efforts is key to cutting carbon emissions. By reusing materials like paper, plastic, and metal, we reduce waste and conserve energy', button: 'https://www.un.org/en/chronicle/article/ecology-recycling#:~:text=Recycling%20metals%20carries%20a%20large,from%20renewables%20or%20hydro%20energy.' },
    { id: 3, heading: 'Embrace Reusability', image: 'https://i.pinimg.com/736x/ea/50/10/ea50105e178066cf6876dfbbe76ed38e.jpg', text: 'Reuse: Embrace the power of reusing items instead of discarding them. Every act of reuse reduces the demand for new products and minimizes waste, leads to a greener planet.', button: 'https://www.weforum.org/agenda/2024/01/accelerating-reuse-models-world-free-of-plastic-waste/' },
    // Add more suggestions as needed
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header button1Text="Back" button2Text="Calculate" />
      <div className="flex-grow container mx-auto px-2 md:px-16 py-8"> {/* Reduced px-4 padding on the container */}
        <h1 className="text-3xl font-bold mb-4 text-center font-serif">Suggestions to Reduce Emissions</h1>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3"> {/* Display cards in 3 columns on large screens */}
          {suggestions.map((suggestion) => (
            <div key={suggestion.id} className="max-w-sm w-full bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 dark:border-gray-700 overflow-hidden"> {/* Ensure max-w-sm and w-full are applied */}
              <a href="/#" onClick={(e) => e.preventDefault()}> {/* Prevent default action */}
                <img className="w-full h-auto rounded-t-lg" src={suggestion.image} alt={`Suggestion ${suggestion.id}`} />
              </a>
              <div className="p-5">
                <a href="/#" onClick={(e) => e.preventDefault()}> {/* Prevent default action */}
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"> {suggestion.heading}</h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{suggestion.text}</p>
                <a href={suggestion.button} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" target="_blank" rel="noopener noreferrer">
                  Read more
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReduceEmission;
