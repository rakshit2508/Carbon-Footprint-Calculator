
import HomePage from "./Components/HomePage";
import CarbonCalculator from "./Components/CarbonCalculator";
import ReduceEmission from "./Components/ReduceEmission"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ResultPage from './Components/ResultPage';
import ErrorPage from './Components/ErrorPage';
// index.js or App.js
import 'tailwindcss/tailwind.css'; // Import Tailwind CSS first
import './App.css'; // Import custom CSS file



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage/>} />
        <Route path="/carbon-calculator" element={<CarbonCalculator  />} />
        <Route path="/reduce" element={<ReduceEmission/>} />
        <Route path="/result" element={<ResultPage/>} />
        <Route path="*" element={<ErrorPage error={{ code: '404', message: 'Page not found.' }} />} />
      </Routes>
  </Router>
  );
}

export default App;
