import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompostingCalculator = () => {
  const [step, setStep] = useState(1); 
  const [inputs, setInputs] = useState({
    yardWaste: 0,
    foodWaste: 0,
    water: 0,
    vehicleType: '',
    fuelType: '',
    distance: 0,
    manHours: 0,
    pretreatmentType: '',
    chemicalInputs: {
      hydrochloricAcid: 0,
      sulphuricAcid: 0,
      potassiumHydroxide: 0,
      electricityChemical: 0
    },
    physicalInputs: {
      electricityPhysical: 0
    },
    thermalInputs: {
      electricityThermal: 0,
      coal: 0,
      naturalGas: 0,
      biomass: 0
    },
    microwaveInputs:{
      electricityMicrowave:0,
    },
    anaerobicDigestionInputs: {
    electricityAnaerobicDigestion: 0,
    sodiumHydroxide:0,
    methaneProduced :0
    }
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setInputs({
        ...inputs,
        [parent]: {
          ...inputs[parent],
          [child]: value
        }
      });
    } else {
      setInputs({ ...inputs, [name]: value });
    }
  };
  
  

  const handleNextStep = () => {
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3)
    {
      setStep(4);
    } else {
      handleSubmit();
    }
  };

  const handleBackStep = () => {
    if (step === 4) {
      setStep(3);
    } else if( step === 3)
    {
      setStep(2);
    }else if (step === 2) {
      setStep(1);
    }
  };

  const calculateTotalEmission = () => {
    // Define emission factors (hypothetical values)
    const emissionFactors = {
      yardWaste: 0, // kg CO2 per kg
      foodWaste: 0, // kg CO2 per kg
      water: 0.000271, // kg CO2 per liter
      distance: {
        Large: { petrol: 0.250, diesel: 0.7375 }, // kg CO2 per km - premium sedan
        Medium: { petrol: 0.189, diesel: 0.5928 }, // medium - petrol - gypsy
        Small: { petrol: 0.138, diesel: 0.3070 }
      },
      manHours: 0, // hypothetical value, kg CO2 per hour
      pretreatment: {
        Chemical: {
          hydrochloricAcid: 0.89, // kg CO2 per kg
          sulphuricAcid: 0.14, // kg CO2 per kg
          potassiumHydroxide: 1.94, // kg CO2 per ml
          electricityChemical: 0.82 // kg CO2 per kWh
        },
        Physical: {
          electricityPhysical: 0.82 // kg CO2 per kWh
        },
        Thermal: {
          electricityThermal: 0.82, // kg CO2 per kWh
          coal: 2.66772, // kg CO2 per kg  (coking coal)
          naturalGas: 2.6928, // kg CO2 per kg
          biomass: 1.7472 // kg CO2 per kg (wood and wood waste)
        },
        Microwave: {
          electricityMicrowave: 0.82 // kg CO2 per kWh
        }
      },
      anaerobicDigestion: {
        electricityAnaerobicDigestion: 0.82 ,// kg CO2 per kWh
        sodiumHydroxide:0.46,
        methaneProduced: 0.82
      }
    };

    let totalEmissionStep1 =
      inputs.yardWaste * emissionFactors.yardWaste +
      inputs.foodWaste * emissionFactors.foodWaste +
      inputs.water * emissionFactors.water +
      inputs.distance *
        emissionFactors.distance[inputs.vehicleType][inputs.fuelType];

    let totalEmissionStep2 = inputs.manHours * emissionFactors.manHours;

    let totalEmissionStep3 = 0;
    if (inputs.pretreatmentType) {
      const pretreatmentType = inputs.pretreatmentType;
      console.log(pretreatmentType);
      const pretreatmentInputs = inputs[pretreatmentType.toLowerCase() + "Inputs"];
      console.log(pretreatmentInputs);
  
      if (pretreatmentType === 'Chemical') {
        // Calculate total emissions for chemical pretreatment
        for (let key in pretreatmentInputs) {
          console.log(key);
          const inputValue = parseFloat(pretreatmentInputs[key]);
          if (!isNaN(inputValue)) {
            const emissionFactor = emissionFactors.pretreatment[pretreatmentType][key];
            console.log(emissionFactor);
            totalEmissionStep3 += inputValue * emissionFactor;
            console.log(totalEmissionStep3);
          } else {
            console.error(`Invalid input value for ${key}`);
          }
        }
      } else if (pretreatmentType === 'Physical' ) {
        // Calculate total emissions for physical or microwave pretreatment
        const inputValue = parseFloat(pretreatmentInputs.electricityPhysical);
        
        if (!isNaN(inputValue)) {
          const emissionFactor = emissionFactors.pretreatment[pretreatmentType].electricityPhysical;
          totalEmissionStep3 += inputValue * emissionFactor;
        } else {
          console.error(`Invalid input value for electricity`);
        }
      } else if ( pretreatmentType === 'Microwave') {
        // Calculate total emissions for physical or microwave pretreatment
        const inputValue = parseFloat(pretreatmentInputs.electricityMicrowave);
        
        if (!isNaN(inputValue)) {
          const emissionFactor = emissionFactors.pretreatment[pretreatmentType].electricityMicrowave;
          totalEmissionStep3 += inputValue * emissionFactor;
        } else {
          console.error(`Invalid input value for electricity`);
        }
      }
       else {
        // Calculate total emissions for thermal pretreatment
        for (let key in pretreatmentInputs) {
          const inputValue = parseFloat(pretreatmentInputs[key]);
          if (!isNaN(inputValue)) {
            const emissionFactor = emissionFactors.pretreatment[pretreatmentType][key];
            totalEmissionStep3 += inputValue * emissionFactor;
          } else {
            console.error(`Invalid input value for ${key}`);
          }
        }
      }
    }
    let totalEmissionStep4 = 0;
    let totalEmissionStep5  = 0;
    if (inputs.anaerobicDigestionInputs) {
      const anaerobicDigestionInputs = inputs.anaerobicDigestionInputs;
  
      const electricityInput = parseFloat(anaerobicDigestionInputs.electricityAnaerobicDigestion);
      const sodiumHydroxideInput = parseFloat(anaerobicDigestionInputs.sodiumHydroxide);
      const methaneProducedInput = parseFloat(anaerobicDigestionInputs.methaneProduced);
  
      if (!isNaN(electricityInput)) {
        const electricityEmissionFactor = emissionFactors.anaerobicDigestion.electricityAnaerobicDigestion;
        totalEmissionStep4 += electricityInput * electricityEmissionFactor;
      } else {
        console.error('Invalid input value for electricity during anaerobic digestion');
      }
      if (!isNaN(sodiumHydroxideInput)) {
        const sodiumHydroxideEmissionFactor = emissionFactors.anaerobicDigestion.sodiumHydroxide;
        totalEmissionStep4 += sodiumHydroxideInput * sodiumHydroxideEmissionFactor;
      } else {
        console.error('Invalid input value for electricity during anaerobic digestion');
      }
  
      if (!isNaN(methaneProducedInput)) {
        const methaneEmissionFactor = emissionFactors.anaerobicDigestion.methaneProduced;
        totalEmissionStep5 = -1* 0.3* methaneProducedInput * methaneEmissionFactor * 0.277777778; // MJ to KWH
      } else {
        console.error('Invalid input value for methane produced during anaerobic digestion');
      }
    }

    return {
      totalEmissionStep1,
      totalEmissionStep2,
      totalEmissionStep3,
      totalEmissionStep4,
      totalEmissionStep5,
      totalEmissionCombined: totalEmissionStep1 + totalEmissionStep2 + totalEmissionStep3 + totalEmissionStep4 + totalEmissionStep5
    };
  };
  

  const handleSubmit = () => {
    const totalEmissions = calculateTotalEmission();
    navigate('/result', { state: totalEmissions });
  };
  
  
  

  return (
    <div className="max-w-lg mx-auto p-6">
      {step === 1 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 1 - Collection</h2>
          <input
            type="number"
            name="yardWaste"
            placeholder="Yard waste (in Kg)"
            onChange={handleInputChange}
            className="w-full mb-4 p-2 text-black rounded-md"
          />
          <input
            type="number"
            name="foodWaste"
            placeholder="Food waste (in Kg)"
            onChange={handleInputChange}
            className="w-full mb-4 p-2 text-black rounded-md"
          />
          <input
            type="number"
            name="water"
            placeholder="Water (in Kg)"
            onChange={handleInputChange}
            className="w-full mb-4 p-2 text-black rounded-md"
          />
          <select
            name="vehicleType"
            onChange={handleInputChange}
            className="w-full mb-4 p-2 text-black appearance-none rounded-md text-sm sm:text-base"
          >
            <option value="">Select Vehicle Type</option>
            <option value="Large">Large</option>
            <option value="Medium">Medium</option>
            <option value="Small">Small</option>
          </select>
          {inputs.vehicleType && (
            <select
              name="fuelType"
              onChange={handleInputChange}
              className="w-full mb-4 p-2 text-black appearance-none rounded-md text-sm sm:text-base"
            >
              <option value="">Select Fuel Type</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
            </select>
          )}
          {inputs.fuelType && (
            <input
              type="number"
              name="distance"
              placeholder="Distance (in km)"
              onChange={handleInputChange}
              className="w-full mb-4 p-2 text-black rounded-md"
            />
          )}
          <button
            onClick={handleNextStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2 className="text-lg font-semibold mb-4">Step 2 - Manual Segregation</h2>
          <input
            type="number"
            name="manHours"
            placeholder="Manhours (in Hours)"
            onChange={handleInputChange}
            className="w-full mb-4 p-2 text-black rounded-md"
          />
           <button
              onClick={handleBackStep}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
            >
              Back
            </button>
          <button
            onClick={handleNextStep}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Next
          </button>
        </div>
      )}
  {step === 3 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Step 3 - Pretreatment</h2>
    <select
      name="pretreatmentType"
      onChange={handleInputChange}
      className="w-full mb-4 p-2 text-black appearance-none rounded-md text-sm sm:text-base"
    >
      <option value="">Select Pretreatment Type</option>
      <option value="Chemical">Chemical</option>
      <option value="Physical">Physical</option>
      <option value="Thermal">Thermal</option>
      <option value="Microwave">Microwave</option>
    </select>
    {inputs.pretreatmentType === 'Chemical' && (
      <div>
        <input
          type="number"
          name="chemicalInputs.hydrochloricAcid"
          placeholder="Hydrochloric Acid (in Kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="chemicalInputs.sulphuricAcid"
          placeholder="Sulphuric Acid (in Kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="chemicalInputs.potassiumHydroxide"
          placeholder="Potassium Hydroxide (in Kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="chemicalInputs.electricityChemical"
          placeholder="Electricity (in kWh)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
      </div>
    )}
    {inputs.pretreatmentType === 'Physical' && (
      <div>
        <input
          type="number"
          name="physicalInputs.electricityPhysical"
          placeholder="Electricity (in kWh)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
      </div>
    )}
    {inputs.pretreatmentType === 'Thermal' && (
      <div>
        <input
          type="number"
          name="thermalInputs.electricityThermal"
          placeholder="Electricity (in kWh)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="thermalInputs.coal"
          placeholder="Coal (in kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="thermalInputs.naturalGas"
          placeholder="Natural Gas (in Kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
        <input
          type="number"
          name="thermalInputs.biomass"
          placeholder="Biomass (in Kg)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
      </div>
    )}
    {inputs.pretreatmentType === 'Microwave' && (
      <div>
        <input
          type="number"
          name="thermalInputs.electricityThermal"
          placeholder="Electricity (in kWh)"
          onChange={handleInputChange}
          className="w-full mb-4 p-2 text-black rounded-md"
        />
      </div>
    )}
     <button
        onClick={handleBackStep}
        className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
     >
        Back
      </button>
    <button
      onClick={handleNextStep}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Next
    </button>
  </div>
)}
  {step === 4 && (
  <div>
    <h2 className="text-lg font-semibold mb-4">Step 4 - Anaerobic Digestion</h2>
    <div>
      <input
        type="number"
        name="anaerobicDigestionInputs.electricityAnaerobicDigestion"
        placeholder="Electricity (in kWh)"
        onChange={handleInputChange}
        className="w-full mb-4 p-2 text-black rounded-md"
      />
       <input
        type="number"
        name="anaerobicDigestionInputs.sodiumHydroxide"
        placeholder="NaOH (in Kg)"
        onChange={handleInputChange}
        className="w-full mb-4 p-2 text-black rounded-md"
      />
      <h3 className="text-md font-semibold mb-2 text-center py-2">Amount of Methane Produced</h3>
      <input
        type="number"
        name="anaerobicDigestionInputs.methaneProduced"
        placeholder="Amount of Methane Produced (in mL)"
        onChange={handleInputChange}
        className="w-full mb-4 p-2 text-black rounded-md"
      />
    </div>
    <button
      onClick={handleBackStep}
      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4"
    >
      Back
    </button>
    <button
      onClick={handleNextStep}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Submit
    </button>
  </div>
)}


    </div>
  );
};

export default CompostingCalculator;
