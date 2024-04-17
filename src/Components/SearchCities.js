import React, { useState, useEffect, useRef } from 'react';
import { AiOutlineSearch } from 'react-icons/ai'; // Import search icon from react-icons library

import { useAQIAPIs } from './useAQIAPIs';

import { TOKEN, SEARCH_CITIES_BASE_URL } from '../Utils/constant';

import CityAQIList from './CityAQIList';

const SearchCities = () => {
    const [url, setUrl] = useState('');
    const [cities , loading, initial, error] = useAQIAPIs(url);
    const [searchText, setSearchText] = useState('');
    const searchInput = useRef(null);

    useEffect(() => {
        searchInput.current.focus();
    }, []);
    
    const searchCityName = (event) => {
        event.preventDefault();
        setUrl(`${SEARCH_CITIES_BASE_URL}?token=${TOKEN}&keyword=${searchText}`);
    }

    const handleSearchTextChange = (event) => {
        setSearchText(event.target.value);
    }

    return (
        <div>
            {error}
            <form onSubmit={e => searchCityName(e)}>
                <label>
                    <div className="search-container">
                        <input
                            type="text"
                            ref={searchInput}
                            value={searchText}
                            placeholder="Search for a city..."
                            onChange={e => handleSearchTextChange(e)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <AiOutlineSearch />
                        </button> {/* Add search icon */}
                    </div>
                </label>
                <input type="submit" value="Show AQI" />
            </form>
            {
                loading ?
                    (<span>loading...</span>)
                    :
                    !initial && (<CityAQIList data={cities.data} />)
            }
        </div>
    );
};

export default SearchCities;
