import React from 'react';
import { useAQIAPIs } from './useAQIAPIs';

import { TOKEN, FEED_AQI_BASE_URL } from '../Utils/constant';

const CityAQIDetails = props => {
    
    const [info, error] = useAQIAPIs(
        `${FEED_AQI_BASE_URL}${props.uid}/?token=${TOKEN}`
    );

    const names = {
        'pm25': { name: "Particulate Matter 2.5 (PM 2.5)", unit: "µg/m³" },
        'pm10': { name: "Particulate Matter 10 (PM 10)", unit: "µg/m³" },
        'o3': { name: "Ozone", unit: "ppm" },
        'no2': { name: "Nitrogen Dioxide", unit: "ppm" },
        'so2': { name: "Sulphur Dioxide", unit: "ppm" },
        'co': { name: "Carbon Monoxide", unit: "ppm" },
        't': { name: "Temperature", unit: "°C" }, // Add temperature with unit °C
    }
    
    const getSpectrum = iaqi => {
        let ret = [];
        Object.entries(iaqi).map(function(item) {
            let key = names[item[0]]; // Check if item exists in the names object
            if (key) {
                let obj = {
                    key: key.name,
                    value: item[1].v,
                    unit: key.unit
                };
                ret.push(obj);
            }
        });
        return ret;
    }
    
    const colorize = (name, value) => {
        if (['Particulate Matter 2.5 (PM 2.5)', 'Particulate Matter 10 (PM 10)', 'Ozone', 'Nitrogen Dioxide', 'Sulphur Dioxide', 'Carbon Monoxide', 'Temperature'].includes(name)) {
            if (value >= 0 && value <= 50) {
                return 'good';
            } else if (value >= 51 && value <= 100) {
                return 'moderate';
            } else if (value >= 101 && value <= 150) {
                return 'unhealthy-sentitive';
            } else if (value >= 151 && value <= 200) {
                return 'unhealthy';
            } else if (value >= 201 && value <= 300) {
                return 'very-unhealthy';
            } else if (value >= 301) {
                return 'hazardous';
            }
        }
        return '';
    }
       
    return(
        <React.Fragment>
            {error}
        {
            info.data ?
                <div className="details">
                    <span>
                        Prominent Pollutant is, <b>{ names[info.data.dominentpol].name }</b>
                    </span>
                    <hr />
                    <ul>
                        {
                            getSpectrum(info.data.iaqi).map((spectrum, i) => (
                                <li key={i}>
                                    <span className={`dot ${colorize(spectrum.key, spectrum.value)}`}></span>
                                    <span>{spectrum.key}</span>: <span>{spectrum.value}</span> {spectrum.unit}
                                </li>
                            ))
                        }
                    </ul>
                </div>
                :
                <span>Loading...</span>
        }
        </React.Fragment>
    )
};

export default CityAQIDetails;
